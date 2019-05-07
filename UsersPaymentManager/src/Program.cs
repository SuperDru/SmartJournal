using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace UsersPaymentManager
{
    public class Program
    {

        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((ctx, builder) =>
                {
                    if (ctx.HostingEnvironment.IsProduction())
                    {
                        Console.WriteLine("superdru production");
                        builder.SetBasePath("/app");
                        builder.AddJsonFile("appsettings.json");
                    }
                    else
                        builder.AddJsonFile("appsettings.Development.json");
                })
                .UseStartup<Startup>();
    }
}