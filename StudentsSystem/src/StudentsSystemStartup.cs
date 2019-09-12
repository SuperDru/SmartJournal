using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;

namespace StudentsSystem
{
    public class StudentsSystemStartup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .AddJsonOptions(
                    options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                );

            services.AddHostedService<ScheduleUpdateHostedService>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }
    }
}