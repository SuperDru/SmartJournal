using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using UsersPaymentManager.Database;
using UsersPaymentManager.Database.Entities;
using UsersPaymentManager.Models;
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
        public static IServiceProvider Services { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("OriginCors",
                    builder =>
                    {
                        builder
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowAnyOrigin()
                            .AllowCredentials();
                    });
            });

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

            services.AddMvc()
                .AddJsonOptions(
                    options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                )
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            //services.AddScoped<IUserService, UserService>();
            //services.AddScoped<ILoginService, LoginService>();
            //services.AddScoped<IAccountService, AccountService>();
            //services.AddScoped<IGroupService, GroupService>();

            services.AddScoped<IGroupManagementService, GroupManagementService>();
            services.AddScoped<IUserManagementService, UserManagementService>();
            services.AddScoped<IScheduleManagementService, ScheduleManagementService>();

            //services.AddScoped<IDatabaseUpdateService, DatabaseUpdateService>();
            //services.AddHostedService<SchedulingDatabaseUpdateService>();

            ConfigureAutoMapper(services);
            ConfigureDatabase(services);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider provider)
        {
            Services = provider;

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseCors("OriginCors");
            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthentication();

            app.UseMvc();
        }

        private static void ConfigureAutoMapper(IServiceCollection services)
        {
            var mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<GroupModel, Group>();
                cfg.CreateMap<Group, GroupModel>();
                cfg.CreateMap<Group, GroupResponse>();

            }).CreateMapper();

            services.AddSingleton(mapper);
        }

        private static void ConfigureDatabase(IServiceCollection services)
        {
            services.AddEntityFrameworkNpgsql();
            services.AddDbContext<DatabaseContext>((p, o) => o.UseNpgsql(Configuration["ConnectionString"]));
        }
    }
}