using System.Reflection;
using Microsoft.EntityFrameworkCore;
using webapi.DB_Operations;
using webapi.Middlewares;
using webapi.Services.LoggerServices;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<webapi.DB_Operations.BookStoreDbContext>(options =>
{
    options.UseInMemoryDatabase(databaseName: "BookStoreDB");
});
builder.Services.AddScoped<IBookStoreDbContext>(provider => provider.GetService<BookStoreDbContext>() ?? throw new InvalidOperationException());

// Automapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Add Service
builder.Services.AddSingleton<ILoggerService, DbLoggerService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseLogMiddleware();

app.MapControllers();

// Data Initialize
DataGenerator.Initialize(app.Services.CreateScope().ServiceProvider);

app.Run();
