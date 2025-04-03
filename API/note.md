# Eager loading
.Include and .ThenInclude methods achieve the eager loading
which is loading the related entities explicitly in a single query
eager loading is the opposite of lazy loading and is good for performance by prevent N+1 problem

e.g. we load the shopping cart item and related product in a single query
return await context.ShoppingCarts
    .Include(x => x.Items)
    .ThenInclude(x => x.Product)
    .FirstOrDefaultAsync(x => x.CartId == Request.Cookies["cartId"]);
