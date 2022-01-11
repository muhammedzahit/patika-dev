using System.Reflection;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using webapi.DB_Operations;
using webapi.Operations.BookOperations.AddBooksOperations;
using webapi.Operations.BookOperations.DeleteBookOperations;
using webapi.Operations.BookOperations.GetBooksOperations;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]s")]
    public class BookController : ControllerBase
    {

        private readonly BookStoreDbContext _context;

        public BookController(BookStoreDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public IActionResult GetBooks()
        {
            GetBooksQuery q = new GetBooksQuery(_context);
            var result = q.Handle("many");
            if (result.Count == 0)
                return BadRequest();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetBookByID(string id)
        {
            GetBooksQuery q = new GetBooksQuery(_context);
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
            var book = _context.Books.SingleOrDefault(x => x.Title == NewBook.Title);
            if(book != null)
                return BadRequest();
            
            AddBookCommand command = new AddBookCommand(_context);
            command.model = NewBook;
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