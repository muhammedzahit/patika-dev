using AutoMapper;
using webapi.DB_Operations;
using webapi.Entities;

namespace webapi.Applications.GenreOperations.Commands;

public class AddGenreCommand
{
    private readonly BookStoreDbContext _context;
    private readonly IMapper _mapper;

    public AddGenreCommandViewModel Model { get; set; }
    
    public AddGenreCommand(BookStoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void Handle()
    {
        var genre = _context.Genres.SingleOrDefault(x => x.Name == Model.Name);
        if (genre is not null)
            throw new InvalidOperationException("Girdiğiniz Tür Zaten Bulunmakta");

        _context.Genres.Add(_mapper.Map<Genre>(Model));
        _context.SaveChanges();
    }
}

public class AddGenreCommandViewModel
{
    public string Name { get; set; } = "";
    public bool IsActive { get; set; } = true;
}