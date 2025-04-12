# Eager loading
.Include and .ThenInclude methods achieve the eager loading
which is loading the related entities explicitly in a single query
eager loading is the opposite of lazy loading and is good for performance by prevent N+1 problem

e.g. we load the shopping cart item and related product in a single query
return await context.ShoppingCarts
    .Include(x => x.Items)
    .ThenInclude(x => x.Product)
    .FirstOrDefaultAsync(x => x.CartId == Request.Cookies["cartId"]);

# Owned entity
The entity has [Owned] tag means they won't have separate table in the DB, they will be owned by other entity and became inline data

# Get parameter from url
[HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrderDetails(int id)

# The proper return form of a adding resouce in a POST method
return CreatedAtAction(nameof(GetOrderDetails), new {id = order.Id}, order);
i.e. you will see this "Location" property from HTTP response header:
Location    https://localhost:5001/api/order/2