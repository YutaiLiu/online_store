using API.Entities;
using Microsoft.EntityFrameworkCore;

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
namespace API.Data;

public class StoreContext(DbContextOptions options) : DbContext(options)
{
    // Note:
    // Above called primary constructor
    // It is a constructor that is called when the class is instantiated
    // with it, you do not need to define a constructor with parameters

    // DbSet is a property that represents a collection of entities
    // It can be used to query and save instances of the entity
    // LINQ queries against DbSet will be translated into queries against the database
    public DbSet<Product> Products { get; set; }
}
