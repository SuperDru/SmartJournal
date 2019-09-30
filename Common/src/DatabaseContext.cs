using Microsoft.EntityFrameworkCore;
using Common;

namespace Common
{
    public class DatabaseContext: DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<TrueSchedule> TrueSchedule { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>(user =>
            {
                user.HasOne(u => u.Account)
                    .WithOne(a => a.User)
                    .HasForeignKey<Account>(a => a.UserId)
                    .HasPrincipalKey<User>(u => u.Id);

                user.HasMany(u => u.Attendance)
                    .WithOne(a => a.User)
                    .HasForeignKey(a => a.UserId)
                    .HasPrincipalKey(u => u.Id);

                user.HasMany(u => u.Groups)
                    .WithOne(ug => ug.User)
                    .HasForeignKey(ug => ug.UserId)
                    .HasPrincipalKey(u => u.Id);

                user.HasMany(u => u.Roles)
                    .WithOne(r => r.User)
                    .HasForeignKey(r => r.UserId)
                    .HasPrincipalKey(u => u.Id);

                user.HasMany(u => u.Payments)
                    .WithOne(p => p.User)
                    .HasForeignKey(p => p.UserId)
                    .HasPrincipalKey(u => u.Id);
            });

            builder.Entity<Group>(group =>
            {
                group.HasOne(g => g.WeekSchedule)
                    .WithOne(w => w.Group)
                    .HasForeignKey<WeekSchedule>(w => w.GroupId)
                    .HasPrincipalKey<Group>(g => g.Id);

                group.HasMany(g => g.TrueSchedules)
                    .WithOne(t => t.Group)
                    .HasForeignKey(t => t.GroupId)
                    .HasPrincipalKey(g => g.Id);

                group.HasMany(g => g.Users)
                    .WithOne(ug => ug.Group)
                    .HasForeignKey(ug => ug.GroupId)
                    .HasPrincipalKey(g => g.Id);

                group.HasMany(g => g.Attendance)
                    .WithOne(x => x.Group)
                    .HasForeignKey(x => x.GroupId)
                    .HasPrincipalKey(x => x.Id);
            });

            builder.Entity<UserRole>().HasOne(x => x.Role)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.RoleId)
                .HasPrincipalKey(x => x.Id);

            builder.Entity<Account>().HasKey(a => a.UserId);
            builder.Entity<Attendance>().HasKey(a => new {a.UserId, a.Date});
            builder.Entity<Payment>().HasKey(p => new {p.UserId, p.CreatedAt});
            builder.Entity<TrueSchedule>().HasKey(t => new {t.GroupId, t.Date});
            builder.Entity<UserGroup>().HasKey(ug => new {ug.GroupId, ug.UserId});
            builder.Entity<UserRole>().HasKey(ur => new {ur.RoleId, ur.UserId});
            builder.Entity<WeekSchedule>().HasKey(w => w.GroupId);
        }
    }
}