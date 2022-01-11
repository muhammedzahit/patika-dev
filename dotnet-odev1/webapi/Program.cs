using Microsoft.EntityFrameworkCore;
using webapi.DB_Operations;


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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Data Initialize
DataGenerator.Initialize(app.Services.CreateScope().ServiceProvider);

app.Run();
