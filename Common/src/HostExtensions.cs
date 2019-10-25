using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;

namespace Common
{
    public static class HostExtensions
    {
        public static IWebHostBuilder AddLogging(this IWebHostBuilder host)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .Enrich.FromLogContext()
                .WriteTo.Console(LogEventLevel.Information)
                .WriteTo.File("logs/debug.log", LogEventLevel.Debug)
                .WriteTo.File("logs/info.log", LogEventLevel.Information)
                .CreateLogger();
            
            return host.UseSerilog();
        }
    }
}