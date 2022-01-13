using AutoMapper;
using webapi.DB_Operations;
using webapi.Entities;

namespace webapi.Applications.GenreOperations.Commands;

public class UpdateGenreCommand
{
    private readonly BookStoreDbContext _context;
    private readonly IMapper _mapper;
    
    public UpdateGenreCommmandViewModel Model { get; set; }
    
    public UpdateGenreCommand(BookStoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void ControlDefaults(Genre genre)
    {
        genre.Name = Model.Name;
        _context.SaveChanges();
    }
    
    public void Handle()
    {
        var genre = _context.Genres.SingleOrDefault(x => x.Id != Model.GenreId && x.Name == Model.Name);
        if (genre is not null)
            throw new InvalidOperationException("Girdiğiniz isimde bir tür bulunmaktadir");

        genre = _context.Genres.SingleOrDefault(x => x.Id == Model.GenreId);
        if (genre is null)
            throw new InvalidOperationException("Girdiğiniz id'ye sahip bir tür bulunmamaktadır.");
        ControlDefaults(genre);
    }
}

public class UpdateGenreCommmandViewModel
{
    public string Name { get; set; } = " ";
    public int GenreId { get; set; }
}