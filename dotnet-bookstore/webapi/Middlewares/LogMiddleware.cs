using System.Diagnostics;
using webapi.Services.LoggerServices;

namespace webapi.Middlewares;

public class LogMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILoggerService _loggerService;

    public LogMiddleware(RequestDelegate next, ILoggerService loggerService)
    {
        _next = next;
        _loggerService = loggerService;
    }

    public async Task Invoke(HttpContext context)
    {
        var watch = new Stopwatch();
        watch.Start();
        string message = "[REQUEST] HTTP " + "  " + context.Request.Method + context.Request.Path;
        _loggerService.WriteMessage(message);
        await _next.Invoke(context);
        message = "[RESPONSE] HTTP" + " " + context.Request.Method + " " + context.Request.Path + " " +
                  context.Response.StatusCode + " " + watch.ElapsedMilliseconds + " ms";
        _loggerService.WriteMessage(message);
        watch.Stop();
    }
}

public static class LogMiddlewareExtension
{
    public static IApplicationBuilder UseLogMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<LogMiddleware>();
    }
}