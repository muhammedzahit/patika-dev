using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using webapi.Entities;

namespace webapi.DB_Operations{
    public class DataGenerator{

        public static void Initialize(IServiceProvider serviceProvider){
            var context = new BookStoreDbContext(serviceProvider.GetRequiredService<DbContextOptions<BookStoreDbContext>>());
            if(context.Books.Any())
                return;
            else{
                context.Genres.AddRange(
                new Genre(){Name = "Utopia"}, new Genre(){Name = "Philosophy"}
                    );
                
                context.Books.AddRange(
                    new Book{Title = "Cesur Yeni Dünya", GenreID=1,PublishDate=new System.DateTime(2000,12,12), ViewCount=0 },
                    new Book{Title = "Sokratesin Savunması", GenreID=2,PublishDate=new System.DateTime(2010,12,12), ViewCount=0 }
                );
            }

            context.SaveChanges();
        }

    }


}