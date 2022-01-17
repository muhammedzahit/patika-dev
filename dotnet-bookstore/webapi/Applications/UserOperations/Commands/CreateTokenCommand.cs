using webapi.DB_Operations;
using webapi.TokenHandler;

namespace webapi.Applications.UserOperations.Commands;

public class CreateTokenCommand
{
    private readonly BookStoreDbContext _context;
    private readonly IConfiguration _configuration;

    public CreateTokenCommandModel Model { get; set; }
    
    public CreateTokenCommand(BookStoreDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public Token Handle()
    {
        var user = _context.Users.SingleOrDefault(x => x.Email == Model.Email && x.Password == Model.Password);
        if (user is null)
            throw new InvalidOperationException("Token istenen kullanici bulunamadi");

        TokenHandler.TokenHandler tokenHandler = new TokenHandler.TokenHandler(_context, _configuration);

        TokenHandler.Token token = tokenHandler.CreateToken();

        user.RefreshToken = token.RefreshToken;
        user.RefreshTokenExpireDate = token.ExpirationDate.AddMinutes(30);
        _context.SaveChanges();
        return token;
    }
}

public class CreateTokenCommandModel
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}