using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UsersPaymentManager.Database;
using UsersPaymentManager.Database.Entities;
using Microsoft.Extensions.DependencyInjection;
using UsersPaymentManager.Services;

namespace UsersPaymentManager
{
    public static class DataAccessExtensions
    {
        public static ConcurrentDictionary<Guid, User> Users { get; set; }
        public static ConcurrentDictionary<Guid, Group> Groups { get; set; }

        private static async Task LoadDataFromDatabase(DatabaseContext db)
        {
            Users = new ConcurrentDictionary<Guid, User>(await db.Users
                .Include(u => u.Account)
                .Include(u => u.Payments)
                .Include(u => u.Roles)
                    .ThenInclude(ur => ur.Role)
                .Include(u => u.Groups)
                .Include(u => u.Attendance)
                .ToDictionaryAsync(u => u.Guid, u => u));

            Groups = new ConcurrentDictionary<Guid, Group>(await db.Groups
                .Include(g => g.WeekSchedule)
                .Include(g => g.TrueSchedules)
                .Include(g => g.Users)
                .ToDictionaryAsync(g => g.Guid, g => g));
        }

        private static async Task Check(DatabaseContext db)
        {
            if (Groups == null || Users == null)
                await LoadDataFromDatabase(db);
        }

        public static async Task AddGroup(this DatabaseContext db, Group @group)
        {
            await Check(db);

            db.Groups.Add(@group);
            await db.SaveChangesAsync();

            var gr = await db.Groups
                .Include(x => x.WeekSchedule)
                .FirstOrDefaultAsync(g => g.Guid == group.Guid);

            Groups[gr.Guid] = gr;
        }

        public static async Task AddUser(this DatabaseContext db, User user)
        {
            await Check(db);

            db.Users.Add(user);
            await db.SaveChangesAsync();

            var u = await db.Users
                .Include(x => x.Account)
                .FirstOrDefaultAsync(x => x.Guid == user.Guid);

            Users[u.Guid] = u;
        }

        public static async Task DeleteGroup(this DatabaseContext db, Guid id)
        {
            await Check(db);

            db.Groups.Remove(Groups[id]);
            await db.SaveChangesAsync();

            Groups.Remove(id, out _);
        }

        public static async Task DeleteUser(this DatabaseContext db, Guid id)
        {
            await Check(db);

            db.Users.Remove(Users[id]);
            await db.SaveChangesAsync();

            Users.Remove(id, out _);
        }

        public static async Task<User> GetUserAsync(this DatabaseContext db, Guid id)
        {
            await Check(db);

            if (Users == null)
                await LoadDataFromDatabase(db);

            return Users?[id];
        }

        public static async Task<Group> GetGroupAsync(this DatabaseContext db, Guid id)
        {
            await Check(db);

            return Groups?[id];
        }

        public static async Task<ICollection<User>> GetUsersAsync(this DatabaseContext db)
        {
            await Check(db);

            return Users?.Values;
        }

        public static async Task<ICollection<Group>> GetGroupsAsync(this DatabaseContext db)
        {
            await Check(db);

            return Groups?.Values;
        }

        public static void SetCacheExpirationTime(this DatabaseContext db, TimeSpan time)
        {
            SchedulingDatabaseUpdateService.ExpirationTime = time;
        }
    }
}