using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using webapi.Applications.UserOperations.Commands;
using webapi.DB_Operations;
using webapi.Entities;
using webapi.TokenHandler;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]s")]
public class UserController : ControllerBase
{
    private readonly BookStoreDbContext _context;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;
    
    public UserController(BookStoreDbContext context, IMapper mapper, IConfiguration configuration)
    {
        _context = context;
        _mapper = mapper;
        _configuration = configuration;
    }

    [HttpPost]
    public IActionResult CreateUser([FromBody] CreateUserCommandModel model)
    {
        CreateUserCommand command = new CreateUserCommand(_context, _mapper);
        try
        {
            command.Model = model;
            command.Handle();
        }
        catch (Exception e)
        {
            return BadRequest(e.ToString());
        }

        return Ok();
    }

    [HttpPost("token")]
    public IActionResult CreateToken([FromBody] CreateTokenCommandModel model)
    {
        CreateTokenCommand command = new CreateTokenCommand(_context, _configuration);
        Token token;
        try
        {
            command.Model = model;
            token = command.Handle();
        }
        catch (Exception e)
        {
            return BadRequest(e.ToString());
        }

        return Ok("Access Token: " + token.AccessToken + "\n" + 
                  "Refresh Token: " + token.RefreshToken);
    }

    [HttpPost("refresh_token/{refreshToken}")]
    public IActionResult RefreshToken(string refreshToken)
    {
        RefreshTokenCommand command = new RefreshTokenCommand(_context, _configuration,
            new RefreshTokenCommandModel() {RefreshToken = refreshToken});
        Token token;
        try
        {
            token = command.Handle();
        }
        catch (Exception e)
        {
            return BadRequest(e.ToString());
        }

        return Ok("Access Token: " + token.AccessToken + "\n" + 
                  "Refresh Token: " + token.RefreshToken);
    }
    
}