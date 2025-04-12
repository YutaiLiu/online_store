using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/payments")]
[ApiController]
public class PaymentsController(PaymentsService paymentsService, StoreContext context) : ControllerBase
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
}
