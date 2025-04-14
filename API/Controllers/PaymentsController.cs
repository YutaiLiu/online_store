using API.Data;
using API.DTOs;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers;

[Route("api/payments")]
[ApiController]
public class PaymentsController(PaymentsService paymentsService, StoreContext context,
    IConfiguration config, ILogger<PaymentsController> logger) : ControllerBase
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ShoppingCartDto>> CreateOrUpdatePaymentIntent()
    {
        var cart = await context.ShoppingCarts.GetOrCreateShoppingCart(context, Request.Cookies["cartId"]);

        var intent = await paymentsService.CreateOrUpdatePaymentIntent(cart);

        if (intent == null) return BadRequest("Failed to create or update payment intent");

        cart.PaymentIntentId = intent.Id;
        cart.ClientSecret = intent.ClientSecret;

        if (context.ChangeTracker.HasChanges())
        {
            var result = await context.SaveChangesAsync();

            if (result == 0) return BadRequest("Failed to save changes");
        }

        return cart.ToDto();
    }

    [HttpPost("webhook")]
    public async Task<IActionResult> StripeWebhook()
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();

        try
        {
            var stripeEvent = ConstructStripeEvent(json);

            if (stripeEvent.Data.Object is not PaymentIntent intent)
            {
                return BadRequest("Invalid event data");
            }

            if (intent.Status == "succeeded") await HandlePaymentIntentSucceeded(intent);
            else await HandlePaymentIntentFailed(intent);

            return Ok();
        }
        catch (StripeException ex)
        {
            logger.LogError(ex, "Stripe webhook error");
            return StatusCode(StatusCodes.Status500InternalServerError, "Webhook error");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An expected error has occurred");
            return StatusCode(StatusCodes.Status500InternalServerError, "Unexpected error");
        }
    }

    private async Task HandlePaymentIntentFailed(PaymentIntent intent)
    {
        var order = await context.Orders
            .Include(x => x.OrderedItems)
            .FirstOrDefaultAsync(x => x.PaymentIntentId == intent.Id)
                ?? throw new Exception("Order not found");

        foreach (var item in order.OrderedItems)
        {
            var productItem = await context.Products
                .FindAsync(item.OrderedProduct.ProductId)
                    ?? throw new Exception("Problem updating order stock");

            // Next: manage quantity in stock logic here
        }

        order.OrderStatus = OrderStatus.PaymentFailed;

        await context.SaveChangesAsync();
    }

    private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
    {
        var order = await context.Orders
           .Include(x => x.OrderedItems)
           .FirstOrDefaultAsync(x => x.PaymentIntentId == intent.Id)
               ?? throw new Exception("Order not found");

        // Next: defense for sneaky behavior, like change order item in cart after checkout
        // because, after checkout payment intent id will be bond with cart and doesn't check ordered items again
        // And
        // Next: manage quantity in stock logic here

        order.OrderStatus = OrderStatus.PaymentReceived;

        var cart = await context.ShoppingCarts.FirstOrDefaultAsync(x => 
            x.PaymentIntentId == intent.Id);
            
        if (cart != null) context.ShoppingCarts.Remove(cart);

        await context.SaveChangesAsync();
    }

    private Event ConstructStripeEvent(string json)
    {
        try
        {
            return EventUtility.ConstructEvent(json,
                Request.Headers["Stripe-Signature"], config["StripeSettings:WhSecret"]);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to construct stripe event");
            throw new StripeException("Invalid signature");
        }
    }
}
