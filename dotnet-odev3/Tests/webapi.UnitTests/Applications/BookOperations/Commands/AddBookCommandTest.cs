using System;
using AutoMapper;
using FluentAssertions;
using webapi.Applications.BookOperations.Commands;
using webapi.DB_Operations;
using webapi.Entities;
using webapi.UnitTests.TestSetup;
using Xunit;

namespace webapi.UnitTests.Applications.BookOperations.Commands;


public class CreateBookCommandTest : IClassFixture<CommonTextFixture>
{
    private readonly BookStoreDbContext _context;
    private readonly IMapper _mapper;
    
    public CreateBookCommandTest(CommonTextFixture fixture)
    {
        _context = fixture.Context;
        _mapper = fixture.Mapper;
    }
    
    [Fact]
    public void WhenGivenTitleIsAlreadyExists_InvalidOperationException_ShouldBeReturn()
    {
        var book = new Book() {Title = "same", PageCount = 12, ViewCount = 0};
        _context.Books.Add(book);
        _context.SaveChanges();

        AddBookCommand command = new AddBookCommand(_context, _mapper);
        command.model = new CreateBookModel() {Title = "same"};
        FluentActions.Invoking(() => command.Handle()).Should().Throw<InvalidOperationException>().And
            .Message.Should().Be("aynı isimde kitap mevcut !!!");
    }
}