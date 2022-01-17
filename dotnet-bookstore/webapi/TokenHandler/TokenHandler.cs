using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using webapi.DB_Operations;
using webapi.Entities;

namespace webapi.TokenHandler;

public class TokenHandler
{
    private readonly BookStoreDbContext _context;
    private readonly IConfiguration _configuration;

    public TokenHandler(BookStoreDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public Token CreateToken()
    {
        Token token = new Token();
        SymmetricSecurityKey symmetricSecurityKey =
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:SecurityKey"]))
            ;
        SigningCredentials credentials =
            new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
        
        token.ExpirationDate = DateTime.Now.AddMinutes(15);

        JwtSecurityToken securityToken = new JwtSecurityToken(
            issuer:_configuration["Token:Issuer"],
            audience:_configuration["Token:Audience"],
            expires: token.ExpirationDate,
            notBefore: DateTime.Now,
            signingCredentials: credentials
        );

        JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
        token.AccessToken = handler.WriteToken(securityToken);
        token.RefreshToken = Guid.NewGuid().ToString();
        return token;
    }
}