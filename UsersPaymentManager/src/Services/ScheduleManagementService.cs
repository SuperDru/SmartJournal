using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UsersPaymentManager.Database;
using UsersPaymentManager.Database.Entities;
using UsersPaymentManager.Models;

namespace UsersPaymentManager.Services
{
    public interface IScheduleManagementService
    {
        Task<ICollection<TrueScheduleModel>> GetTrueSchedule(Guid id, DateTime startTime, DateTime endTime);

        Task UpdateTrueSchedule(Guid id, ICollection<TrueScheduleModel> request);
    }

    public class ScheduleManagementService: IScheduleManagementService
    {
        private readonly DatabaseContext _db;

        public ScheduleManagementService(DatabaseContext db)
        {
            _db = db;
        }


        public async Task<ICollection<TrueScheduleModel>> GetTrueSchedule(Guid id, DateTime startTime, DateTime endTime)
        {
            await BuildSchedule(id, endTime);

            var group = await _db.GetGroupAsync(id);

            return group.TrueSchedules
                .Where(x => x.IsLesson && x.Date >= startTime && x.Date <= endTime)
                .Select(x => new TrueScheduleModel()
                {
                    Date = x.Date,
                    Discount = x.Discount,
                    StartTime = x.StartTime
                }).ToList();
        }

        public async Task UpdateTrueSchedule(Guid id, ICollection<TrueScheduleModel> request)
        {
            var newSchedule = request.OrderBy(x => x.Date);

            var last = newSchedule.Last();

            var group = await _db.GetGroupAsync(id);

            await BuildSchedule(id, last.Date);

        }

        public async Task BuildSchedule(Guid groupId, DateTime endTime)
        {
            var group = await _db.GetGroupAsync(groupId);

            var weekSchedule = new Dictionary<DayOfWeek, string>();

            for (var i = 0; i < 7; i++)
                if (group.WeekSchedule.Days[i])
                    weekSchedule[(DayOfWeek)((i + 1) % 7) ] = group.WeekSchedule.StartTimes[i];

            var today = DateTime.Today;

            var last = today.AddMonths(1) < endTime ? endTime : today.AddMonths(1);

            group.TrueSchedules.RemoveAll(x => !x.IsFixed && x.Date >= today);

            for (var cur = today; cur < last; cur = cur.AddDays(1))
                if (weekSchedule.ContainsKey(cur.DayOfWeek))
                    group.TrueSchedules.Add(new TrueSchedule()
                    {
                        Date = cur,
                        Discount = 0,
                        IsFixed = false,
                        IsLesson = true,
                        StartTime = weekSchedule[cur.DayOfWeek]
                    });

            _db.Groups.Update(group);
            await _db.SaveChangesAsync();
        }
    }
}