using System.Linq;
using webapi.Common;
using webapi.DB_Operations;

namespace webapi.Operations.BookOperations.GetBooksOperations;

public class GetBooksQuery
{
    private readonly BookStoreDbContext _dbContext;

    public GetBooksQuery(BookStoreDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public List<BookViewModel> Handle(string type, int id = -1)
    {
        var book_list = new List<Book>();
        if (type == "many")
        {
            book_list = _dbContext.Books.OrderBy(x => x.ID).ToList<Book>();
        }
        else
        {
            book_list = _dbContext.Books.Where(x => x.ID == id).ToList<Book>();
            _dbContext.SaveChanges();
        }
        List<BookViewModel> vm = new List<BookViewModel>();
        foreach(Book b in book_list)
        {
            vm.Add(new BookViewModel()
            {
                Title = b.Title,
                Genre = ((GenreEnum) b.GenreID).ToString(),
                PageCount = b.PageCount,
                PublishDate = b.PublishDate.ToString("d"),
                ViewCount = b.ViewCount
            });
        }

        return vm;
    }
}

public class BookViewModel
{
    public string Title { get; set; }

    public string Genre { get; set; }

    public int PageCount { get; set; }
    
    public string PublishDate { get; set; }
    
    public int ViewCount { get; set; }
}