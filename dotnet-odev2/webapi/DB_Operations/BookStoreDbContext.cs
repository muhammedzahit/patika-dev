using Microsoft.EntityFrameworkCore;
using webapi.Entities;

namespace webapi.DB_Operations{
    public class BookStoreDbContext : DbContext{
        public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options) : base(options){
            
        }

         public DbSet<Book> Books {get; set;}
         public DbSet<Genre> Genres { get; set; }

    }
}