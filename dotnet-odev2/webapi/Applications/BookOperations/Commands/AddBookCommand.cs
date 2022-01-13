using AutoMapper;
using webapi.DB_Operations;
using webapi.Entities;

namespace webapi.Applications.BookOperations.Commands;

public class AddBookCommand
{
    private readonly BookStoreDbContext _dbContext;
    private readonly IMapper _mapper;
    public CreateBookModel model { get; set; }
    
    public AddBookCommand(BookStoreDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public void Handle()
    {
        Book newBook = _mapper.Map<Book>(model);
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