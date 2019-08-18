using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Storage
{
    public class StorageStartup
    {
        private static IConfiguration _configuration;
        
        public StorageStartup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureDatabase(services);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
        }
        
        private static void ConfigureDatabase(IServiceCollection services)
        {
            services.AddEntityFrameworkNpgsql();
            services.AddDbContext<DatabaseContext>((p, o) => o.UseNpgsql(_configuration["ConnectionString"]));
        }
    }
}