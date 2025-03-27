using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

// static class can only have static constructor or default constructor

public class DbInitializer
{
    // if you do not explicitly define a constructor, the compiler will automatically create a default constructor for you

    // Using static method can let you call the method without creating an instance of the class
    public static void InitDb(WebApplication app)
    {
        // using statement is a C# construct that enables the correct use of IDisposable objects
        // It ensures that the object is disposed of when it is no longer needed
        using var scope = app.Services.CreateScope();

        // Add null check for context
        var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
            ?? throw new InvalidOperationException("Fail to retrieve. StoreContext is null");

        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
            ?? throw new InvalidOperationException("Fail to retrieve. UserManager is null");

        SeedData(context, userManager);
    }

    private static async Task SeedData(StoreContext context, UserManager<User> userManager)
    {
        context.Database.Migrate();

        if (!userManager.Users.Any())
        {
            var user = new User
            {
                UserName = "Yutai_test",
                Email = "yutai@test.com"
            };
            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Customer");

            var admin = new User
            {
                UserName = "admin_test",
                Email = "admin@test.com"
            };
            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, ["Admin", "Customer"]);
        }

        if (context.Products.Any())
        {
            return;
        }

        var products = new List<Product>
        {
            new() {
                Name = "Angular Speedster Board 2000",
                Description =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 20000,
                PictureURL = "/images/products/sb-ang1.png",
                Brand = "Angular",
                Type = "Boards",
                StockQuantity = 100
            },
            new() {
                Name = "Green Angular Board 3000",
                Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                Price = 15000,
                PictureURL = "/images/products/sb-ang2.png",
                Brand = "Angular",
                Type = "Boards",
                StockQuantity = 100
            },
            new() {
                Name = "Core Board Speed Rush 3",
                Description =
                    "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                Price = 18000,
                PictureURL = "/images/products/sb-core1.png",
                Brand = "NetCore",
                Type = "Boards",
                StockQuantity = 100
            },
            new() {
                Name = "Net Core Super Board",
                Description =
                    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                Price = 30000,
                PictureURL = "/images/products/sb-core2.png",
                Brand = "NetCore",
                Type = "Boards",
                StockQuantity = 100
            },
            new() {
                Name = "React Board Super Whizzy Fast",
                Description =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 25000,
                PictureURL = "/images/products/sb-react1.png",
                Brand = "React",
                Type = "Boards",
                StockQuantity = 100
            },
            new() {
                Name = "Typescript Entry Board",
                Description =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 12000,
                PictureURL = "/images/products/sb-ts1.png",
                Brand = "TypeScript",
                Type = "Boards",
                StockQuantity = 100
            },
            new() {
                Name = "Core Blue Hat",
                Description =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 1000,
                PictureURL = "/images/products/hat-core1.png",
                Brand = "NetCore",
                Type = "Hats",
                StockQuantity = 100
            },
            new() {
                Name = "Green React Woolen Hat",
                Description =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 8000,
                PictureURL = "/images/products/hat-react1.png",
                Brand = "React",
                Type = "Hats",
                StockQuantity = 100
            },
            new() {
                Name = "Purple React Woolen Hat",
                Description =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 1500,
                PictureURL = "/images/products/hat-react2.png",
                Brand = "React",
                Type = "Hats",
                StockQuantity = 100
            },
            new() {
                Name = "Blue Code Gloves",
                Description =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 1800,
                PictureURL = "/images/products/glove-code1.png",
                Brand = "VS Code",
                Type = "Gloves",
                StockQuantity = 100
            },
            new() {
                Name = "Green Code Gloves",
                Description =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 1500,
                PictureURL = "/images/products/glove-code2.png",
                Brand = "VS Code",
                Type = "Gloves",
                StockQuantity = 100
            },
            new() {
                Name = "Purple React Gloves",
                Description =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 1600,
                PictureURL = "/images/products/glove-react1.png",
                Brand = "React",
                Type = "Gloves",
                StockQuantity = 100
            },
            new() {
                Name = "Green React Gloves",
                Description =
                    "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 1400,
                PictureURL = "/images/products/glove-react2.png",
                Brand = "React",
                Type = "Gloves",
                StockQuantity = 100
            },
            new() {
                Name = "Redis Red Boots",
                Description =
                    "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                Price = 25000,
                PictureURL = "/images/products/boot-redis1.png",
                Brand = "Redis",
                Type = "Boots",
                StockQuantity = 100
            },
            new() {
                Name = "Core Red Boots",
                Description =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                Price = 18999,
                PictureURL = "/images/products/boot-core2.png",
                Brand = "NetCore",
                Type = "Boots",
                StockQuantity = 100
            },
            new() {
                Name = "Core Purple Boots",
                Description =
                    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                Price = 19999,
                PictureURL = "/images/products/boot-core1.png",
                Brand = "NetCore",
                Type = "Boots",
                StockQuantity = 100
            },
            new() {
                Name = "Angular Purple Boots",
                Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                Price = 15000,
                PictureURL = "/images/products/boot-ang2.png",
                Brand = "Angular",
                Type = "Boots",
                StockQuantity = 100
            },
            new() {
                Name = "Angular Blue Boots",
                Description =
                    "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                Price = 18000,
                PictureURL = "/images/products/boot-ang1.png",
                Brand = "Angular",
                Type = "Boots",
                StockQuantity = 100
            },
        };

        context.Products.AddRange(products);

        context.SaveChanges();
    }
}
