namespace webapi.Services.LoggerServices;

public class ConsoleLoggerService : ILoggerService
{
    public void WriteMessage(string message)
    {
        Console.WriteLine("[console] " + message);
    }
}