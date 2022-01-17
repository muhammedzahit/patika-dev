using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Entities;

public class User
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public string Name { get; set; } = "";

    public string Email { get; set; } = "";

    public string Password { get; set; } = "";

    public string RefreshToken { get; set; } = "";
    
    public DateTime? RefreshTokenExpireDate { get; set; }
}