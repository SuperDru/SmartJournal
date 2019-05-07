using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UsersPaymentManager.Database.Entities;

namespace UsersPaymentManager.Database
{
    public static class EntitiesInitExtensions
    {
        private static Random Rand = new Random();

        private const int UsersAmount = 100;
        private const int GroupsAmount = 5;

        private static DateTime StartDate = DateTime.Parse("01/01/2017");

        public static void Init(this EntityTypeBuilder<User> builder)
        {
            var hasher = new PasswordHasher<string>();
            var users = new List<User>();

            using(var reader = new StreamReader("src/Database/DataSeed/Users.csv"))
            {
                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();
                    var values = line.Split(',');

                    users.Add(new User()
                    {
                        Id = int.Parse(values[0]),
                        Guid = Guid.Parse(values[1]),
                        Name = values[2],
                        Surname = values[3],
                        Patronymic = values[4],
                        PhoneNumber = values[5],
                        Email = values[6],
                        Password = hasher.HashPassword(values[6], values[7])
                    });
                }
            }

            builder.HasData(users);
        }

        public static void Init(this EntityTypeBuilder<Group> builder)
        {
            var groups = new List<Group>();

            for (var id = 1; id <= GroupsAmount; id++)
            {
                groups.Add(new Group()
                {
                    Id = id,
                    Guid = Guid.NewGuid(),
                    Name = $"Group{id}",
                    Cost = Rand.Next(100, 2001)
                });
            }

            builder.HasData(groups);
        }

        public static void Init(this EntityTypeBuilder<UserGroup> builder)
        {
            var userGroups = new List<UserGroup>();

            for (var id = 1; id <= GroupsAmount; id++)
            {
                var maxUsers = Rand.Next(20, 51);
                var uniqueList = new LinkedList<int>();
                for (var i = 0; i < maxUsers; i++)
                {
                    int userId;

                    do userId = Rand.Next(1, UsersAmount + 1);
                    while (uniqueList.Contains(userId));

                    uniqueList.AddLast(userId);

                    userGroups.Add(new UserGroup()
                    {
                        GroupId = id,
                        UserId = userId
                    });
                }
            }

            builder.HasData(userGroups);
        }

        public static void InitAccountsAndPayments(this ModelBuilder builder)
        {
            var accounts = new LinkedList<Account>();
            var payments = new LinkedList<Payment>();

            for (var id = 1; id <= UsersAmount; id++)
            {
                var maxPayments = Rand.Next(0, 10);
                var currentDate = StartDate.AddDays(Rand.Next(10, 800));

                accounts.AddLast(new Account()
                {
                    Amount = 0,
                    Dept = 0,
                    UserId = id
                });

                for (var j = 0; j < maxPayments; j++)
                {
                    var value = Rand.Next(100, 10000);

                    payments.AddLast(new Payment()
                    {
                        Amount = value,
                        Payday = currentDate,
                        UserId = id
                    });

                    accounts.Last.Value.UpdatedAt = currentDate;
                    accounts.Last.Value.Amount += value;

                    currentDate = currentDate.AddDays(Rand.Next(10, 50));
                }
            }

            builder.Entity<Account>().HasData(accounts);
            builder.Entity<Payment>().HasData(payments);
        }

        public static void InitWeekAndTrueSchedules(this ModelBuilder builder)
        {
            var week = new LinkedList<WeekSchedule>();
            var month = new LinkedList<TrueSchedule>();

            var times = new [] { "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00" };

            for (var id = 1; id < GroupsAmount + 1; id++)
            {
                var w = new WeekSchedule()
                {
                    Duration = 90,
                    GroupId = id
                };

                int num;
                do
                {
                    w.Days = new bool[7];
                    w.StartTimes = new string[7];

                    num = Rand.Next(0, 5);
                    w.Days[num] = true;
                    w.Days[num + 2] = true;
                    w.StartTimes[num] = times[Rand.Next(0, 7)];
                    w.StartTimes[num + 2] = times[Rand.Next(0, 7)];
                } while (week.Any(x =>
                    x.Days[num] && (
                        x.StartTimes[num] == w.StartTimes[num] ||
                        x.StartTimes[num + 2] == w.StartTimes[num + 2])));

                week.AddLast(w);


            }
        }
    }
}