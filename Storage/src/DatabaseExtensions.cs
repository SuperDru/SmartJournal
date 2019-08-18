using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Storage
{
    public static class DatabaseExtensions
    {
        public static IIncludableQueryable<User, List<Attendance>> GetUsersWithIncludes(this DatabaseContext db) =>
            db.Users
                .Include(u => u.Account)
                .Include(u => u.Payments)
                .Include(u => u.Roles)
                .ThenInclude(ur => ur.Role)
                .Include(u => u.Groups)
                .Include(u => u.Attendance);

        public static IIncludableQueryable<Group, List<UserGroup>> GetGroupsWithIncludes(this DatabaseContext db) =>
            db.Groups
                .Include(g => g.WeekSchedule)
                .Include(g => g.TrueSchedules)
                .Include(g => g.Users);
    }
}