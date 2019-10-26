using System.IO;
using Microsoft.AspNetCore.Hosting;
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
                .WriteTo.Logger(l =>
                {
                    l.WriteTo.Console(LogEventLevel.Information);
                    l.Filter.ByIncludingOnly(ExcludeDatabaseInformation);
                })
                .WriteTo.Logger(l =>
                {
                    l.WriteTo.File("logs/info.log", LogEventLevel.Information);
                    l.Filter.ByIncludingOnly(ExcludeDatabaseInformation);
                })
                .WriteTo.File("logs/debug.log", LogEventLevel.Debug)
                .CreateLogger();
            
            return host.UseSerilog();
        }

        private static bool ExcludeDatabaseInformation(LogEvent e)
        {
            var source = e.Properties["SourceContext"];
            var str = new StringWriter();
            source.Render(str);

            return str.ToString().Replace("\"", "") != "Microsoft.EntityFrameworkCore.Database.Command";
        }
    }
}