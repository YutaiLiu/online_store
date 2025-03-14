using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/shopping-cart")]
    [ApiController]
    public class ShoppingCartController(StoreContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<ShoppingCartDto>> GetShoppingCart()
        {
            var cart = await GetCart();

            if (cart == null) cart = await CreateCart();

            return cart.ToDto();
        }

        [HttpPost("add")]
        public async Task<ActionResult<ShoppingCartDto>> AddToCart(int productId, int quantity)
        {
            var product = await context.Products.FindAsync(productId);

            if (product == null) return BadRequest("Product not found");

            var cart = await GetCart();

            if (cart == null) cart = await CreateCart();

            try
            {
                cart.AddItem(product, quantity);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            // Save changes to the database
            // Entity Framework Core will automatically detect the changes
            // and it will pack all the changes above as a whole into a single SQL query
            // if there is an error, it will rollback the transaction
            // and the result will be an integer that represents the number of changes made
            // if the result is 0, it means that no changes were made to the database
            // and probably there was an error
            var result = await context.SaveChangesAsync();

            if (result == 0) return BadRequest("Failed to save changes");

            return cart.ToDto();
        }

        [HttpPost("remove")]
        public async Task<ActionResult<ShoppingCartDto>> RemoveFromCart(int productId, int quantity)
        {
            var product = await context.Products.FindAsync(productId);

            if (product == null) return BadRequest("Product not found");

            var cart = await GetCart();

            if (cart == null) return BadRequest("Cart not found");

            try
            {
                cart.RemoveItem(product, quantity);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            var result = await context.SaveChangesAsync();

            if (result == 0) return BadRequest("Failed to save changes");

            return cart.ToDto();
        }

        private async Task<ShoppingCart?> GetCart()
        {
            // .Include and .ThenInclude methods achieve the eager loading
            // which is loading the related entities explicitly in a single query
            // eager loading is the opposite of lazy loading and is good for performance
            // e.g. we load the shopping cart item and related product in a single query
            return await context.ShoppingCarts
                .Include(x => x.Items)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.CartId == Request.Cookies["cartId"]);
        }

        private async Task<ShoppingCart> CreateCart()
        {
            var cart = new ShoppingCart
            {
                CartId = Guid.NewGuid().ToString()
            };

            context.ShoppingCarts.Add(cart);
            await context.SaveChangesAsync();

            var cookieOptions = new CookieOptions
            {
                SameSite = SameSiteMode.None,
                Secure = true,
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30)
            };
            Response.Cookies.Append("cartId", cart.CartId, cookieOptions);

            return cart;
        }

    }
}