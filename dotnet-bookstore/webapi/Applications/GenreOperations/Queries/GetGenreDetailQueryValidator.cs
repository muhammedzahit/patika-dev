using FluentValidation;

namespace webapi.Applications.GenreOperations.Queries;

public class GetGenreDetailQueryValidator : AbstractValidator<GetGenreDetailQuery>
{
    public GetGenreDetailQueryValidator()
    {
        RuleFor(x => x.GenreId).GreaterThan(0);
    }
}