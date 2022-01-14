using webapi.DB_Operations;
using webapi.Entities;

namespace webapi.UnitTests.TestSetup;

public static class Genres
{
    public static void AddGenres(this BookStoreDbContext context)
    {
        context.Genres.AddRange(
            new Genre(){Name = "Utopia"}, new Genre(){Name = "Philosophy"}
        );
    }
}