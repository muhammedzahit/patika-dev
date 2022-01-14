using webapi.DB_Operations;
using webapi.Entities;

namespace webapi.Applications.BookOperations.Commands;

public class DeleteBookCommand
{
    private readonly IBookStoreDbContext _dbContext;

    public DeleteBookCommand(IBookStoreDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void Handle(Book book)
    {
        _dbContext.Books.Remove(book);
        _dbContext.SaveChanges(); 
    }
}
