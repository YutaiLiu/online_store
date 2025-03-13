using System;
using API.DTOs;
using API.Entities;

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
}
