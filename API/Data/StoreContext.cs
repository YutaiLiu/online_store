using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

// Note:
// Apply Entity Framework Core to the project
// Pros:
// - It is a powerful and flexible ORM
// - It is a mature and well-documented library
// - It is a cross-platform library
// - It is a performant library
// - It is a library that supports LINQ. LINQ is a query language that allows you to query data from different data sources
// - It is a library that supports migrations. Migrations are a way to incrementally update the database schema
// And it's easy for data modelling and querying
using Microsoft.EntityFrameworkCore;
namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    // Note:
    // Above called primary constructor
    // It is a constructor that is called when the class is instantiated
    // with it, you do not need to define a constructor with parameters

    // DbSet is a property that represents a collection of entities
    // It can be used to query and save instances of the entity
    // LINQ queries against DbSet will be translated into queries against the database
    public required DbSet<Product> Products { get; set; }

    public required DbSet<ShoppingCart> ShoppingCarts { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>().HasData(
            new IdentityRole { Id = "e9711380-2ce6-4deb-b66f-fa35c4b83fc8", Name = "Admin", NormalizedName = "ADMIN" },
            new IdentityRole { Id = "682e05d2-78d7-4e3d-9639-0082f4284277", Name = "Customer", NormalizedName = "CUSTOMER" }
        );
    }
}
