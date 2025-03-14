using API.Data;
using API.Middleware;
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

app.MapControllers();

DbInitializer.InitDb(app);

app.Run();
