using Microsoft.AspNetCore.Mvc;
using webapi.DB_Operations;

namespace webapi.Operations.BookOperations.AddBooksOperations;

public class AddBookCommand
{
    private readonly BookStoreDbContext _dbContext;

    public CreateBookModel model { get; set; }
    
    public AddBookCommand(BookStoreDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void Handle()
    {
        Book newBook = new Book();
        newBook.Title = model.Title;
        newBook.PageCount = model.PageCount;
        newBook.PublishDate = model.PublishDate;
        newBook.ViewCount = 0;
        
        _dbContext.Books.Add(newBook);
        _dbContext.SaveChanges();
    }
    
}

public class CreateBookModel
{
    public string Title { get; set; }

    public int GenreID { get; set; }

    public int PageCount { get; set; }
    
    public DateTime PublishDate { get; set; }
    
    public int ViewCount { get; set; }
}