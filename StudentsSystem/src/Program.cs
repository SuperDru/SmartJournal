using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Common;

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