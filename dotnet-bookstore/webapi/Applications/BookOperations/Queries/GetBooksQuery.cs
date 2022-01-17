using AutoMapper;
using webapi.DB_Operations;
using webapi.Entities;

namespace webapi.Applications.BookOperations.Queries;

public class GetBooksQuery
{
    private readonly IBookStoreDbContext _dbContext;
    private readonly IMapper _mapper;

    public GetBooksQuery(IBookStoreDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
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

        List<BookViewModel> vm = _mapper.Map<List<BookViewModel>>(book_list);

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