using System.IO;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Common;
using Microsoft.Extensions.Logging;

namespace StudentsSystem
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        private static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .AddDatabase()
                .AddLogging()
                .UseStartup<StudentsSystemStartup>();
    }
}