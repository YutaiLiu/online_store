using API.Data;
using API.Entities;
using API.Middleware;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// aka Dependency Injection, order isn't important
builder.Services.AddControllers();

// Establish DB connection
builder.Services.AddDbContext<StoreContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();

// Add the Identity API endpoints to the application
builder.Services.AddIdentityApiEndpoints<User>(options =>
{
    options.User.RequireUniqueEmail = true;
}).AddRoles<IdentityRole>().AddEntityFrameworkStores<StoreContext>();

// Using different methods to manage the lifetime of the service in .Net
// AddTransient: create a new instance every time, then dispose of it
// AddScoped: create a new instance per request, then dispose of it
// AddSingleton: create a single instance for the lifetime of the application, then dispose of it
builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.
// order is important here
// we should add exception middleware on the top of the pipeline
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(policy =>
{
    policy.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:3000");
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();

DbInitializer.InitDb(app);

app.Run();
