using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using webapi.Applications.BookOperations.Commands;
using webapi.Applications.GenreOperations.Commands;
using webapi.Applications.GenreOperations.Queries;
using webapi.DB_Operations;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]s")]
public class GenreController : ControllerBase
{
    private readonly BookStoreDbContext _context;
    private readonly IMapper _mapper;
    
    public GenreController(BookStoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetGenres()
    {
        GetGenresQuery query = new GetGenresQuery(_context, _mapper);
        return Ok(query.Handle());
    }

    [HttpGet("{id}")]
    public IActionResult GetDetailGenre(string id)
    {
        GetGenreDetailQuery query = new GetGenreDetailQuery(_context, _mapper);
        query.GenreId = Convert.ToInt32(id);

        GetGenreDetailQueryValidator validator = new GetGenreDetailQueryValidator();
        
        try
        {
            validator.ValidateAndThrow(query);    
            var genre = query.Handle();
            return Ok(genre);
        }
        catch (Exception e)
        {
            return BadRequest(e.ToString());
        }
    }

    [HttpPost]
    public IActionResult AddGenre([FromBody] AddGenreCommandViewModel model)
    {
        AddGenreCommand command = new AddGenreCommand(_context, _mapper);
        command.Model = model;

        AddGenreCommandValidator validator = new AddGenreCommandValidator();
        try
        {
            validator.ValidateAndThrow(command);
            command.Handle();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.ToString());
        }
    }

    [HttpPut("{id}")]
    public IActionResult UpdateGenre(string id, [FromBody] UpdateGenreCommmandViewModel model)
    {
        UpdateGenreCommand command = new UpdateGenreCommand(_context, _mapper);
        UpdateGenreCommandValidator validator = new UpdateGenreCommandValidator();
        command.Model = model;
        model.GenreId = Convert.ToInt32(id);
        try
        {
            validator.ValidateAndThrow(command);
            command.Handle();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.ToString());
        }
        
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteBook(string id)
    {
        DeleteGenreCommand command = new DeleteGenreCommand(_context, _mapper);
        try
        {
            command.GenreId = Convert.ToInt32(id);
            command.Handle();
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.ToString());
        }

    }
}