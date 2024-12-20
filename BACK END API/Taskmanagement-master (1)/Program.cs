using Task_app.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Task_app.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()   // Allow any origin
               .AllowAnyMethod()   // Allow any HTTP method
               .AllowAnyHeader();  // Allow any header
    });
});

// Add services to the container.

// Register the DbContext with PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add controllers and views
builder.Services.AddControllers();

// Add Swagger generator
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1",
        Description = "A simple ASP.NET Core Web API"
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.

// Enable Swagger middleware in all environments
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    c.RoutePrefix = ""; // Set Swagger UI at the root URL
});

app.UseCors("AllowAll");

// Other middleware
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllers(); // Map API controllers

// Default route for MVC (optional, not needed if focusing on APIs)
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
