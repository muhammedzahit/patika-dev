using Microsoft.EntityFrameworkCore;
using webapi.Entities;

namespace webapi.DB_Operations{
    public class BookStoreDbContext : DbContext, IBookStoreDbContext
    {
        public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options) : base(options){
            
        }

         public DbSet<Book> Books {get; set;}
         public DbSet<Genre> Genres { get; set; }
         
         public DbSet<User> Users { get; set; }

         public override int SaveChanges()
         {
             base.SaveChanges();
             return 1;
         }
    }
}