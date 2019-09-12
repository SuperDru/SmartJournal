using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        private readonly IBus _bus;

        public AttendanceService(IDatabaseCache cache, IBus bus)
        {
            _cache = cache;
            _bus = bus;
        }
        
        public ICollection<AttendanceResponse> GetAttendance(Guid groupId, DateTime @from, DateTime to)
        {
            var group = _cache.GetGroup(groupId);
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
            var group = _cache.GetGroup(groupId);

            IDictionary<int, float> deptChanges = new Dictionary<int, float>();
            
            foreach (var userAttendance in newAttendance)
            {
                var user = _cache.GetUser(userAttendance.UserId);
                var newDays = userAttendance.UpdatedAttendance.OrderBy(d => d.Date).ToList();

                var oldDays = user.Attendance
                    .Where(a => a.Date >= newDays.First().Date && a.Date <= newDays.Last().Date)
                    .ToDictionary(od => od.Date, od => od);

                foreach (var newDay in newDays)
                {
                    var oldDay = oldDays[newDay.Date];

                    if (oldDay == null && newDay.IsAttended)
                    {
                        user.Attendance.Add(new Attendance
                        {
                            Date = newDay.Date,
                            GroupId = group.Id,
                            PaymentAmount = -group.Cost
                        });
                        deptChanges[user.Id] += group.Cost;
                    }
                    else if (oldDay != null && !newDay.IsAttended)
                    {
                        user.Attendance.Remove(oldDay);
                        deptChanges[user.Id] -= oldDay.PaymentAmount;
                    }
                }
            }

            await _cache.AddOrUpdateGroup(group);
            await _bus.Transform(deptChanges);
        }

        public async Task Transform(IDictionary<int, float> deptChanges)
        {
            foreach (var (userId, amount) in deptChanges)
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

                deptChanges[userId] = -curAmount;
            }
            
            await _bus.Transform(deptChanges);
            await _cache.UpdateUsers();
        }
    }
}