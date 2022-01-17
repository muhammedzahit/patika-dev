using AutoMapper;
using webapi.DB_Operations;
using webapi.Entities;

namespace webapi.Applications.UserOperations.Commands;

public class CreateUserCommand
{
    private readonly BookStoreDbContext _context;
    private readonly IMapper _mapper;

    public CreateUserCommandModel Model { get; set; }
    
    public CreateUserCommand(BookStoreDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void Handle()
    {
        var user = _context.Users.SingleOrDefault(x => x.Email == Model.Email);
        if (user is not null)
            throw new InvalidOperationException("Eklemek istediginiz kullanici zaten bulunmakta");
        user = _mapper.Map<User>(Model);
        _context.Users.Add(user);
        _context.SaveChanges();
    }
    
    
}

public class CreateUserCommandModel
{
    public string Name { get; set; } = "";

    public string Email { get; set; } = "";

    public string Password { get; set; } = "";
}