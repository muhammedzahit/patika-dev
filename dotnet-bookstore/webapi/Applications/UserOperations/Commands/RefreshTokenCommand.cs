using webapi.DB_Operations;
using webapi.TokenHandler;

namespace webapi.Applications.UserOperations.Commands;

public class RefreshTokenCommand
{
    private readonly BookStoreDbContext _context;
    private readonly IConfiguration _configuration;

    public RefreshTokenCommandModel Model { get; set; }
    
    public RefreshTokenCommand(BookStoreDbContext context, IConfiguration configuration, RefreshTokenCommandModel model)
    {
        _context = context;
        _configuration = configuration;
        Model = model;
    }

    public Token Handle()
    {
        var user = _context.Users.SingleOrDefault(x => x.RefreshToken == Model.RefreshToken && x.RefreshTokenExpireDate > DateTime.Now );
        if (user is null)
            throw new InvalidOperationException("Refresh Token Gecerli Degil !!!");

        TokenHandler.TokenHandler tokenHandler = new TokenHandler.TokenHandler(_context, _configuration);

        TokenHandler.Token token = tokenHandler.CreateToken();

        user.RefreshToken = token.RefreshToken;
        user.RefreshTokenExpireDate = token.ExpirationDate.AddMinutes(30);
        _context.SaveChanges();
        return token;
    }

}

public class RefreshTokenCommandModel
{
    public string RefreshToken { get; set; } = "";
}