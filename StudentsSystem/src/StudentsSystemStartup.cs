using System;
using System.IO;
using StudentsSystem;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using Common;
using Swashbuckle.AspNetCore.Swagger;

namespace StudentsSystem
{
    public class StudentsSystemStartup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(o =>
                {
                    o.Filters.Add<ApiExceptionFilter>();
                    o.Filters.Add<ApiActionFilter>();
                })
                .AddJsonOptions(
                    options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                );
            
            services.AddCors();

            services.AddHostedService<ScheduleUpdateHostedService>();
            services.AddHostedService<StatisticsUpdateHostedService>();

            services.AddSingleton<IStatisticsCalculationService, StatisticsCalculationService>();
            services.AddScoped<IAccountManagementService, AccountManagementService>();
            services.AddScoped<IAttendanceService, AttendanceService>();
            services.AddScoped<IScheduleUpdateScopedService, ScheduleUpdateScopedService>();
            
            services.AddSwaggerGen();
            services.ConfigureSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Info
                {
                    Title = "Smart Journal",
                    Version = "v1"
                });

                foreach (var path in Directory.EnumerateFiles(AppContext.BaseDirectory, "*.xml"))
                    options.IncludeXmlComments(path);
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(x => x.SwaggerEndpoint("/swagger/v1/swagger.json", "Smart Journal Documentation"));
            
            app.UseCors(o => o.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin().AllowCredentials());
            app.UseMvc();
        }
    }
}