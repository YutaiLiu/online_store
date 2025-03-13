using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/shopping-cart")]
    [ApiController]
    public class ShoppingCartController(StoreContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<ShoppingCart>> GetShoppingCart()
        {
            var cart = await context.ShoppingCarts
                .Include(x => x.Items)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.CartId == Request.Cookies["cartId"]);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddToCart(int productId, int quantity)
        {
            return Ok();
        }

    }
}