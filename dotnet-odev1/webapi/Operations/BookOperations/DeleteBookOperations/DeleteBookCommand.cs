using webapi.DB_Operations;

namespace webapi.Operations.BookOperations.DeleteBookOperations;

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
