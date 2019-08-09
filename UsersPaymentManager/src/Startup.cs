using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using UsersPaymentManager.Database;
using UsersPaymentManager.Services;

namespace UsersPaymentManager
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static IConfiguration Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

            services.AddMvc()
                .AddJsonOptions(
                    options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                )
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddScoped<IGroupManagementService, GroupManagementService>();
            services.AddScoped<IUserManagementService, UserManagementService>();
            services.AddScoped<IScheduleManagementService, ScheduleManagementService>();
            services.AddScoped<IAccountManagementService, AccountManagementService>();
            services.AddScoped<IAttendanceManagementService, AttendanceManagementService>();
            
            ConfigureDatabase(services);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseCors(o => o.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseStaticFiles();
            app.UseAuthentication();

            app.UseMvc();
        }

        private static void ConfigureDatabase(IServiceCollection services)
        {
            services.AddEntityFrameworkNpgsql();
            services.AddDbContext<DatabaseContext>((p, o) => o.UseNpgsql(Configuration["ConnectionString"]));
        }
    }
}