using Microsoft.EntityFrameworkCore;
using webapi.Entities;

namespace webapi.DB_Operations;

public interface IBookStoreDbContext
{
    public DbSet<Book> Books {get; set;}
    public DbSet<Genre> Genres { get; set; }
    public int SaveChanges();

}