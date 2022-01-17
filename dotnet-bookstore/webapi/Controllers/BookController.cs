using System.Reflection;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using webapi.Applications.BookOperations.Commands;
using webapi.Applications.BookOperations.Queries;
using webapi.DB_Operations;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]s")]
    public class BookController : ControllerBase
    {

        private readonly IBookStoreDbContext _context;
        private readonly IMapper _mapper;

        public BookController(IBookStoreDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        [Authorize]
        [HttpGet]
        public IActionResult GetBooks()
        {
            GetBooksQuery q = new GetBooksQuery(_context, _mapper);
            var result = q.Handle("many");
            if (result.Count == 0)
                return BadRequest();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetBookByID(string id)
        {
            GetBooksQuery q = new GetBooksQuery(_context, _mapper);
            var result = q.Handle("one", Convert.ToInt32(id));
            Console.WriteLine(result);
            if (result.Count == 0)
                return BadRequest();
            else
                return Ok(result);
        }

        [HttpPost]
        public IActionResult PostNewBook([FromBody] CreateBookModel NewBook)
        {
            AddBookCommand command = new AddBookCommand(_context, _mapper);
            command.model = NewBook;

            try
            {
                AddBookCommandValidator validator = new AddBookCommandValidator();
                validator.ValidateAndThrow(command);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            command.Handle();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(string id){
            var book = _context.Books.SingleOrDefault(x => x.ID == Convert.ToInt32(id));
            if(book == null)
                return BadRequest();

            DeleteBookCommand command = new DeleteBookCommand(_context);
            command.Handle(book);
            return Ok();
        }

    }
}