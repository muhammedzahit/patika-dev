using webapi.DB_Operations;
using webapi.Entities;

namespace webapi.Applications.BookOperations.Commands;

public class DeleteBookCommand
{
    private readonly BookStoreDbContext _dbContext;

    public DeleteBookCommand(BookStoreDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void Handle(Book book)
    {
        _dbContext.Books.Remove(book);
        _dbContext.SaveChanges(); 
    }
}
