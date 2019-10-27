using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Common;
using Microsoft.Extensions.Logging;

namespace StudentsSystem
{
    public interface IAttendanceService
    {
        ICollection<AttendanceResponse> GetAttendance(Guid groupId, DateTime from, DateTime to);
        Task UpdateAttendance(Guid groupId, ICollection<AttendanceRequest> newAttendance);
        Task TransformAmountToAttendance(IDictionary<int, float> deptChanges);
    }
    
    public class AttendanceService: IAttendanceService
    {
        private readonly ICacheRepository _cache;
        private readonly IAccountManagementService _account;
        private readonly ILogger<AttendanceService> _logger;

        public AttendanceService(ICacheRepository cache, IAccountManagementService account, ILogger<AttendanceService> logger)
        {
            _cache = cache;
            _logger = logger;
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
                
//                if (newDays.Last().Date > DateTime.Today)
//                    Errors.AttemptToChangeAttendanceLaterTodayError.Throw(StatusCodes.Status403Forbidden);

                if (newDays.Count(newDay => group.TrueSchedules.All(x => x.Date != newDay.Date)) != 0)
                    Errors.DayNotOnScheduleError.Throw(StatusCodes.Status403Forbidden);
            }

            foreach (var userAttendance in newAttendance)
            {
                var user = _cache.GetExistingUser(userAttendance.UserId);
                var newDays = userAttendance.UpdatedAttendance.OrderBy(d => d.Date).ToList();

                var oldDays = user.Attendance
                    .Where(a => a.Date >= newDays.FirstOrDefault()?.Date && a.Date <= newDays.LastOrDefault()?.Date)
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
                        _logger.LogInformation("Adding day {date}", newDay.Date);
                    }
                    else if (oldDay != null && !newDay.IsAttended)
                    {
                        user.Attendance.Remove(oldDay);
                        if (oldDay.PaymentAmount > 0)
                        {
                            await _account.Deposit(user.Guid, oldDay.PaymentAmount);
                            oldDay.PaymentAmount = 0;
                        }
                        deptChanges[user.Id] = deptChanges.ContainsKey(user.Id) ? deptChanges[user.Id] + oldDay.PaymentAmount : oldDay.PaymentAmount;
                        _logger.LogInformation("Removing day {date}", newDay.Date);
                    }
                }
            }

            await _cache.AddOrUpdateGroup(group);
            _logger.LogInformation("Updated attendance in database");
            await _cache.Transform(deptChanges, _logger);
            await TransformAmountToAttendance(await _account.Notify(deptChanges.Keys, _logger));
        }

        public async Task TransformAmountToAttendance(IDictionary<int, float> deptChanges)
        {
            foreach (var (userId, amount) in deptChanges.ToArray())
            {
                var user = _cache.GetUser(userId);

                var curAmount = amount;

                var att = user.Attendance.OrderBy(x => x.Date).ToList();
                var firstNotPaid = att.FirstOrDefault(x => x.PaymentAmount <= 0);
                foreach (var x in att.Where(x => x.Date > firstNotPaid?.Date && x.PaymentAmount > 0))
                {
                    _logger.LogInformation("Cancel payment for attendance: date = {date}, amount = {amount} (for ordering purposes)", x.Date, x.PaymentAmount);
                    curAmount += x.PaymentAmount;
                    x.PaymentAmount = -x.PaymentAmount;
                }

                var notPaidAttendance = att.Where(x => x.PaymentAmount <= 0);

                foreach (var day in notPaidAttendance)
                {
                    if (curAmount >= -day.PaymentAmount)
                    {
                        day.PaymentAmount = -day.PaymentAmount;
                        curAmount -= day.PaymentAmount;
                    }
                    _logger.LogInformation("Payment for attendance: date = {date}, amount = {amount}", day.Date, day.PaymentAmount);
                }

                if (curAmount > 0)
                    await _account.Deposit(user.Guid, curAmount);
                    
                deptChanges[userId] = curAmount;
            }
            
            await _cache.Transform(deptChanges, _logger);
        }
    }
}