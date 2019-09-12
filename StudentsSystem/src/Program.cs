using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Storage;

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
                .ConfigureAppConfiguration((ctx, builder) =>
                {
                    //builder.AddJsonFile(Path.Combine(ctx.HostingEnvironment.ContentRootPath, "..",
                      //  "Configuration/DatabaseCfg.json"));
                })
                .AddDatabase()
                .UseStartup<StudentsSystemStartup>();
    }
}