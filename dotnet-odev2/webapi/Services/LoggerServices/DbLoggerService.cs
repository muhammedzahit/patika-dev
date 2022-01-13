namespace webapi.Services.LoggerServices;

public class DbLoggerService : ILoggerService
{
    public void WriteMessage(string message)
    {
        Console.WriteLine("[database] " + message);
    }
}