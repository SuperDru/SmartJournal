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

        Task UpdateTrueSchedule(Guid id, ICollection<TrueScheduleRequest> request);
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
            var group = await _db.GetGroupAsync(id);

            _db.TrueSchedule.AddRange(group.BuildSchedule(endTime));
            
            await _db.SaveChangesAsync();
            
            return group.TrueSchedules
                .Where(x => x.Date >= startTime && x.Date <= endTime && x.Lesson)
                .Select(x => new TrueScheduleModel
                {
                    Date = x.Date,
                    Discount = x.Discount,
                    StartTime = x.StartTime
                }).ToList();
        }

        public async Task UpdateTrueSchedule(Guid id, ICollection<TrueScheduleRequest> request)
        {
            var group = await _db.GetGroupAsync(id);

            var scheduleToAdd = new List<TrueSchedule>();
            var scheduleToUpdate = new List<TrueSchedule>();
            var scheduleToDelete = new List<TrueSchedule>();
            
            foreach (var day in request)
            {
                var trueSchedule = group.TrueSchedules.FirstOrDefault(x => x.Date == day.Date);
                
                if (trueSchedule == null)
                    scheduleToAdd.Add(group.AddTrueSchedule(day.Date, day.StartTime, day.Discount, true));
                else if (day.ToDelete)
                {
                    if (!trueSchedule.Fixed)
                    {
                        trueSchedule.Fixed = true;
                        trueSchedule.Lesson = false;

                        scheduleToUpdate.Add(trueSchedule);
                    }
                    else
                    {
                        scheduleToDelete.Add(trueSchedule);
                    }
                }
                else
                {
                    scheduleToUpdate.Add(trueSchedule);
                    trueSchedule.Discount = day.Discount;
                    trueSchedule.StartTime = day.StartTime;
                    trueSchedule.Lesson = true;
                    trueSchedule.Fixed = !group.IsDayOfWeekSchedule(trueSchedule.Date);
                }
            }
            
            _db.TrueSchedule.AddRange(scheduleToAdd);
            _db.TrueSchedule.UpdateRange(scheduleToUpdate);
            _db.TrueSchedule.RemoveRange(scheduleToDelete);
            
            await _db.SaveChangesAsync();
        }
    }
}