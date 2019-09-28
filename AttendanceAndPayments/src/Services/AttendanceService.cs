using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Storage;

namespace AttendanceAndPayments
{
    public interface IAttendanceService
    {
        ICollection<AttendanceResponse> GetAttendance(Guid groupId, DateTime from, DateTime to);
        Task UpdateAttendance(Guid groupId, ICollection<AttendanceRequest> newAttendance);
        Task Transform(IDictionary<int, float> deptChanges);
    }
    
    public class AttendanceService: IAttendanceService
    {
        private readonly IDatabaseCache _cache;
        private readonly IAccountManagementService _account;

        public AttendanceService(IDatabaseCache cache, IAccountManagementService account)
        {
            _cache = cache;
            _account = account;
        }
        
        public ICollection<AttendanceResponse> GetAttendance(Guid groupId, DateTime from, DateTime to)
        {
            var group = _cache.GetExistingGroup(groupId);
            var users = group.Users;
            
            return (from user in users
                let days = user.User.Attendance.Where(a => a.Date >= @from && a.Date <= to)
                select new AttendanceResponse
                {
                    UserId = user.User.Guid,
                    Attendance = days.Select(x => x.ToUserDayInfo()).ToList()
                }).ToList();
        }

        public async Task UpdateAttendance(Guid groupId, ICollection<AttendanceRequest> newAttendance)
        {
            var group = _cache.GetExistingGroup(groupId);

            IDictionary<int, float> deptChanges = new Dictionary<int, float>();

            foreach (var userAttendance in newAttendance)
            {
                var newDays = userAttendance.UpdatedAttendance.OrderBy(d => d.Date).ToList();
                
                if (newDays.Last().Date > DateTime.Today)
                    Errors.AttemptToChangeAttendanceLaterTodayError.Throw(StatusCodes.Status403Forbidden);

                if (newDays.Count(newDay => group.TrueSchedules.All(x => x.Date != newDay.Date)) != 0)
                    Errors.DayNotOnScheduleError.Throw(StatusCodes.Status403Forbidden);
            }

            foreach (var userAttendance in newAttendance)
            {
                var user = _cache.GetExistingUser(userAttendance.UserId);
                var newDays = userAttendance.UpdatedAttendance.OrderBy(d => d.Date).ToList();

                var oldDays = user.Attendance
                    .Where(a => a.Date >= newDays.First().Date && a.Date <= newDays.Last().Date)
                    .ToDictionary(od => od.Date, od => od);

                foreach (var newDay in newDays)
                {
                    if (!oldDays.TryGetValue(newDay.Date, out var oldDay) && newDay.IsAttended)
                    {
                        user.Attendance.Add(new Attendance
                        {
                            Date = newDay.Date,
                            GroupId = group.Id,
                            PaymentAmount = -group.Cost
                        });
                        deptChanges[user.Id] = deptChanges.ContainsKey(user.Id) ? deptChanges[user.Id] + group.Cost : group.Cost;
                    }
                    else if (oldDay != null && !newDay.IsAttended)
                    {
                        user.Attendance.Remove(oldDay);
                        deptChanges[user.Id] = deptChanges.ContainsKey(user.Id) ?  deptChanges[user.Id] - oldDay.PaymentAmount : -oldDay.PaymentAmount;
                    }
                }
            }

            await _cache.AddOrUpdateGroup(group);
            await _cache.Transform(deptChanges);
            await Transform(await _account.Notify(deptChanges.Keys));
        }

        public async Task Transform(IDictionary<int, float> deptChanges)
        {
            foreach (var (userId, amount) in deptChanges.ToArray())
            {
                var user = _cache.GetUser(userId);

                var curAmount = amount;
                var notPaidAttendance = user.Attendance.Where(x => x.PaymentAmount <= 0);

                foreach (var day in notPaidAttendance)
                {
                    if (curAmount >= -day.PaymentAmount)
                    {
                        day.PaymentAmount = -day.PaymentAmount;
                        curAmount -= day.PaymentAmount;
                    }
                }

                if (curAmount > 0)
                    await _account.Deposit(user.Guid, curAmount);
                    
                deptChanges[userId] = curAmount;
            }
            
            await _cache.Transform(deptChanges);
        }
    }
}