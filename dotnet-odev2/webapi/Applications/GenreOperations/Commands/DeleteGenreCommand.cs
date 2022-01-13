using AutoMapper;
using webapi.DB_Operations;

namespace webapi.Applications.GenreOperations.Commands;

public class DeleteGenreCommand
{
    private readonly BookStoreDbContext _context;
    private readonly IMapper _mapper;

    public int GenreId { get; set; }
    
    public DeleteGenreCommand(BookStoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void Handle()
    {
        var genre = _context.Genres.SingleOrDefault(x => x.Id == GenreId);
        if (genre is null)
        {
            throw new InvalidOperationException("girdiğiniz id'ye sahip bir genre yok!!!");
        }

        _context.Genres.Remove(genre);
        _context.SaveChanges();
    }   
}