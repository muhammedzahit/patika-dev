using FluentValidation;

namespace webapi.Applications.GenreOperations.Commands;

public class UpdateGenreCommandValidator : AbstractValidator<UpdateGenreCommand>
{
    public UpdateGenreCommandValidator()
    {
        RuleFor(x => x.Model.Name).NotEmpty();
        RuleFor(x => x.Model.GenreId).GreaterThan(0);
    }
}