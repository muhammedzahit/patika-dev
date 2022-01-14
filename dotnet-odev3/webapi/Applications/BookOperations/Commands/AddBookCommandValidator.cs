using FluentValidation;
using webapi.Common;

namespace webapi.Applications.BookOperations.Commands;

public class AddBookCommandValidator : AbstractValidator<AddBookCommand>
{
    private int genreEnumLength = Enum.GetNames(typeof(GenreEnum)).Length;

    public AddBookCommandValidator()
    {
        RuleFor(command => command.model.GenreID).GreaterThan(0).LessThan(genreEnumLength + 1);
        RuleFor(command => command.model.Title).NotEmpty();
        RuleFor(command => command.model.PageCount).GreaterThan(0);
        RuleFor(command => command.model.ViewCount).Equals(0);
    }
}