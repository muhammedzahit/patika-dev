using FluentValidation;

namespace webapi.Applications.GenreOperations.Commands;

public class AddGenreCommandValidator : AbstractValidator<AddGenreCommand>
{
    public AddGenreCommandValidator()
    {
        RuleFor(x => x.Model.Name).NotEmpty();
    }
}