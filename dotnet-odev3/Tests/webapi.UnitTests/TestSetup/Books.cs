using webapi.DB_Operations;
using webapi.Entities;

namespace webapi.UnitTests.TestSetup;

public static class Books
{
    public static void AddBooks(this BookStoreDbContext context)
    {
        context.Books.AddRange(
            new Book{Title = "Cesur Yeni Dünya", GenreID=1,PublishDate=new System.DateTime(2000,12,12), ViewCount=0 },
            new Book{Title = "Sokratesin Savunması", GenreID=2,PublishDate=new System.DateTime(2010,12,12), ViewCount=0 }
        );
    }
}