using AutoMapper;
using webapi.DB_Operations;

namespace webapi.Applications.GenreOperations.Queries;

public class GetGenreDetailQuery
{
    private readonly BookStoreDbContext _context;
    private readonly IMapper _mapper;

    public int GenreId { get; set; }
    
    public GetGenreDetailQuery(BookStoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public GetGenreDetailViewModel Handle()
    {
        var genre = _context.Genres.Where(x => x.Id == GenreId).SingleOrDefault();
        if (genre is null)
            throw new InvalidOperationException("Verilen Id'de kitap bulunamadi");

        return _mapper.Map<GetGenreDetailViewModel>(genre);
    }
}

public class GetGenreDetailViewModel
{
    public string Name { get; set; } = "";

    public string IsActive { get; set; } = "active";
}