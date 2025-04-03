using API.Controllers;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ShoppingCartExtension
{
    // this is an extension method of static class
    // static class always contain utility functions
    // so we can use this method from a shopping cart object
    // without having to instantiate this static class
    // which can separate the concerns of the code
    // and make it more readable
    public static ShoppingCartDto ToDto(this ShoppingCart cart)
    {
        return new ShoppingCartDto
        {
            Id = cart.Id,
            CartId = cart.CartId,
            PaymentIntentId = cart.PaymentIntentId,
            ClientSecret = cart.ClientSecret,
            Items = cart.Items.Select(x => new ShoppingCartItemDto
            {
                ProductId = x.ProductId,
                Name = x.Product.Name,
                Price = x.Product.Price,
                Description = x.Product.Description,
                Type = x.Product.Type,
                PictureURL = x.Product.PictureURL,
                Brand = x.Product.Brand,
                Quantity = x.Quantity
            }).ToList()
        };
    }

    public static async Task<ShoppingCart> GetOrCreateShoppingCart(this IQueryable<ShoppingCart> query, StoreContext context, string? cartId)
    {
        return await query
                .Include(x => x.Items)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.CartId == cartId)
            ?? await CreateCart(context);
    }

    private static async Task<ShoppingCart> CreateCart(StoreContext context)
        {
            var cart = new ShoppingCart
            {
                CartId = Guid.NewGuid().ToString()
            };

            context.ShoppingCarts.Add(cart);
            await context.SaveChangesAsync();

            return cart;
        }
}
