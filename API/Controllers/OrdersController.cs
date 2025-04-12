using System.Runtime.CompilerServices;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
[ApiController]
[Route("api/orders")]
public class OrdersController(StoreContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetUserOrders()
    {
        var orders = await context.Orders
            .ProjectToDto()
            .Where(x => x.BuyerEmail == User.GetUsername())
            .ToListAsync();

        return orders;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetOrderDetails(int id)
    {
        var order = await context.Orders
            .ProjectToDto()
            .Where(x => x.BuyerEmail == User.GetUsername() && x.Id == id)
            .FirstOrDefaultAsync();

        if (order == null) return NotFound();

        return order;
    }

    [HttpPost]
    public async Task<ActionResult<OrderDto>> CreateOrder(CreateOrderDto orderDto)
    {
        var shoppingCart = await context.ShoppingCarts.GetOrCreateShoppingCart(context, Request.Cookies["cartId"]);

        if (shoppingCart == null || shoppingCart.Items.Count() == 0 
            || string.IsNullOrEmpty(shoppingCart.PaymentIntentId)) 
            return BadRequest("Shopping cart is empty or not found, or payment is not ready yet.");

        // Next: add quantity in stock check in the function
        var items = CreateOrderedItems(shoppingCart.Items);

        var subtotal = items.Sum(x => x.Price * x.Quantity);
        var deliveryFee = CalculateDeliveryFee(subtotal);

        var order = new Order
        {
            BuyerEmail = User.GetUsername(),
            ShippingAddress = orderDto.ShippingAddress,
            PaymentSummary = orderDto.PaymentSummary,
            OrderedItems = items,
            Subtotal = subtotal,
            DeliveryFee = deliveryFee,
            PaymentIntentId = shoppingCart.PaymentIntentId,
        };

        context.Orders.Add(order);
        context.ShoppingCarts.Remove(shoppingCart);
        Response.Cookies.Delete("cartId");

        var result = await context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Failed to create and store order");

        // the first arguement is telling client which endpoint that can query the new object
        // the second arguement is the required parameter of the endpoint
        // the third argument is the new object itself
        return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }, order.ToDto());
    }

    private long CalculateDeliveryFee(long subtotal)
    {
        return subtotal > 10000 ? 0 : 1000;
    }

    private List<OrderedItem> CreateOrderedItems(List<ShoppingCartItem> items)
    {
        var orderedItems = new List<OrderedItem>();

        foreach (ShoppingCartItem item in items)
        {
            var orderedItem = new OrderedItem
            {
                OrderedProduct = new OrderedProduct
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    PictureUrl = item.Product.PictureURL,
                },
                Price = item.Product.Price,
                Quantity = item.Quantity,
            };

            orderedItems.Add(orderedItem);
        }

        return orderedItems;
    }
}
