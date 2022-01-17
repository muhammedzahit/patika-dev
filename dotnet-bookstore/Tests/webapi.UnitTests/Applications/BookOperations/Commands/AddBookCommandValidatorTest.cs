using System;
using FluentAssertions;
using FluentValidation;
using Microsoft.AspNetCore.Components.Web;
using webapi.Applications.BookOperations.Commands;
using webapi.Common;
using webapi.UnitTests.TestSetup;
using Xunit;

namespace webapi.UnitTests.Applications.BookOperations.Commands;

public class AddBookCommandValidatorTest : IClassFixture<CommonTextFixture>
{
    private int _genreEnumLength = Enum.GetNames(typeof(GenreEnum)).Length;
    [Theory]
    [InlineData(" ", -1, -1, 0)]
    [InlineData("Eco", 12, 1, 0)]
    public void WhenInvalidInputsAreGiven_Validator_ShouldBeReturnErrors(
        string title, int genreId, int pageCount, int viewCount)
    {
        AddBookCommand command = new AddBookCommand(null, null);
        AddBookCommandValidator validator = new AddBookCommandValidator();
        command.model = new CreateBookModel()
        {
            Title = title, GenreID = genreId, PageCount = pageCount, ViewCount = viewCount,
            PublishDate = DateTime.Now.AddYears(-1)
        };
        var result = validator.Validate(command);

        result.Errors.Count.Should().BeGreaterThan(0);
    }
  
}