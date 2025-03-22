using API.Entities;
using API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using API.Extensions;
using API.RequestHelpers;

namespace API.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController(StoreContext context) : ControllerBase
    {
        // Old way of dependency injection
        // we can use primary constructor injection instead, see above
        // private readonly StoreContext _context;

        // public ProductsController(StoreContext context)
        // {
        //     this._context = context;
        // }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(
            [FromQuery]ProductRequestParams requestParams)
        {
            // build query
            var query = context.Products
                .ApplySort(requestParams.OrderBy)
                .Search(requestParams.Search)
                .ApplyFilter(requestParams.Brands, requestParams.Types)
                .AsQueryable();

            // execute query
            // query will only be executed when ToListAsync is called
            var products = await PagedList<Product>.ToPagedList(
                query, requestParams.PageNumber, requestParams.PageSize);

            return Ok(new {
                products.Metadata,
                products
            });
        }

        // e.g. GET api/products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }
    }
}
