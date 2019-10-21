using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Common
{
    public static class DatabaseExtensions
    {
        public static IWebHostBuilder AddDatabase(this IWebHostBuilder host)
        {
            host.ConfigureAppConfiguration((ctx, builder) =>
            {
                builder.AddJsonFile(Path.Combine(ctx.HostingEnvironment.ContentRootPath, "..",
                    "Configuration/DatabaseCfg.json"));
            });
            
            host.ConfigureServices((context, services) =>
            {
                services.AddEntityFrameworkNpgsql();
                services.AddDbContext<DatabaseContext>((p, o) => o.UseNpgsql(context.Configuration["ConnectionString"]));
                services.AddScoped<ICacheRepository, CacheRepository>();
                services.AddSingleton<DatabaseCache>();
            });

            return host;
        }
        public static IIncludableQueryable<User, List<Attendance>> GetUsersWithIncludes(this DatabaseContext db) =>
            db.Users
                .Include(u => u.Account)
                .Include(u => u.Payments)
                .Include(u => u.AccountHistory)
                .Include(u => u.Roles)
                .ThenInclude(ur => ur.Role)
                .Include(u => u.Groups)
                .ThenInclude(x => x.Group)
                .Include(u => u.Attendance);

        public static IIncludableQueryable<Group, List<TrueSchedule>> GetGroupsWithIncludes(this DatabaseContext db) =>
            db.Groups
                .Include(g => g.WeekSchedule)
                .Include(g => g.Attendance)
                .Include(g => g.Users)
                .ThenInclude(x => x.User)
                .Include(g => g.Statistics)
                .Include(g => g.TrueSchedules);
    }
}