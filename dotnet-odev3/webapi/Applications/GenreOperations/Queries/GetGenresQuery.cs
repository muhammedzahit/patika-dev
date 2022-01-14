using AutoMapper;
using webapi.DB_Operations;

namespace webapi.Applications.GenreOperations.Queries;

public class GetGenresQuery
{
    private readonly IBookStoreDbContext _context;
    private readonly IMapper _mapper;

    public GetGenresViewModel model { get; set; }

    public GetGenresQuery(IBookStoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public List<GetGenresViewModel> Handle()
    {
        var genres = _context.Genres.Where(x => x.IsActive).ToList();
        return _mapper.Map<List<GetGenresViewModel>>(genres);
    }
}

public class GetGenresViewModel
{
    public string Name { get; set; } = "";

    public bool IsActive { get; set; } = true;
}