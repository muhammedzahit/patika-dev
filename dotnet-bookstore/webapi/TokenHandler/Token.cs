namespace webapi.TokenHandler;

public class Token
{
    public String AccessToken { get; set; } = " ";
    public string RefreshToken { get; set; } = "";
    public DateTime ExpirationDate { get; set; }
}