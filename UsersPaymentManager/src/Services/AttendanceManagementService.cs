using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsersPaymentManager.Database;
using Storage;
using UsersPaymentManager.Models;

namespace UsersPaymentManager.Services
{
    public interface IAttendanceManagementService
    {
        Task<ICollection<AttendanceResponse>> GetAttendance(Guid id, DateTime start, DateTime end);
        Task<ICollection<AttendanceResponse>> UpdateAttendance(Guid id, IEnumerable<AttendanceRequest> request);
        Task UpdateDayPaymentsByGroup(Guid groupId, Guid paymentId = default);
        Task UpdateDayPaymentsByUserWithoutSave(Guid userId, Guid paymentId = default);
        Task CancelUpdate(Guid userId, Guid paymentId);
    }
    
    public class AttendanceManagementService: IAttendanceManagementService
    {
        private readonly DatabaseContext _db;
        private readonly IAccountManagementService _accountManagementService;


        public AttendanceManagementService(DatabaseContext db, IAccountManagementService accountManagementService)
        {
            _db = db;
            _accountManagementService = accountManagementService;
        }

        public async Task<ICollection<AttendanceResponse>> GetAttendance(Guid id, DateTime start, DateTime end)
        {
            var group = await _db.GetGroupAsync(id);
            var users = group.Users;

            return (from user in users
                let account = user.User.Account
                let days = user.User.Attendance.Where(a => a.Date >= start && a.Date <= end)
                select new AttendanceResponse
                {
                    User = user.User.ToUserResponse(),
                    Attendance = days.Select(x => x.ToUserDayInfo()).ToList()
                }).ToList();
        }

        public async Task<ICollection<AttendanceResponse>> UpdateAttendance(Guid id, IEnumerable<AttendanceRequest> request)
        {
            DateTime startDate = DateTime.MaxValue, endDate = DateTime.MinValue;

            var group = _db.GetGroupAsync(id);

            foreach (var userAttendance in request)
            {
                var user = await _db.GetUserAsync(userAttendance.UserId);

                var newDays = userAttendance.UpdatedAttendance.OrderBy(d => d.Date).ToList();

                var s = newDays.First().Date;
                var e = newDays.Last().Date;

                startDate = s < startDate ? s : startDate;
                endDate = e > endDate ? e : endDate;

                var oldDays = user.Attendance
                    .Where(a => a.Date >= s && a.Date <= e)
                    .ToDictionary(od => od.Date, od => od);


                var attendanceToAdd = new List<Attendance>();
                var attendanceToRemove = new List<Attendance>();
                
                foreach (var newDay in newDays)
                {
                    var oldDay = oldDays[newDay.Date];

                    if (oldDay == null && newDay.IsAttended)
                        attendanceToAdd.Add(user.AddAttendance(group.Id, newDay.Date));
                    else if (oldDay != null && !newDay.IsAttended)
                    {
                        await _accountManagementService.IncreaseAmount(user.Guid, oldDay.PaymentAmount);
                        user.Attendance.Remove(oldDay);
                        attendanceToRemove.Add(oldDay);
                    }
                }

                _db.AddRange(attendanceToAdd);
                _db.RemoveRange(attendanceToRemove);
                
                await UpdateDayPaymentsByGroup(id);
            }

            return await GetAttendance(id, startDate, endDate);
        }
        
        public async Task UpdateDayPaymentsByGroup(Guid groupId, Guid paymentId = default)
        {
            var group = await _db.GetGroupAsync(groupId);
            var users = group.Users;

            foreach (var user in users)
                await UpdateDayPaymentsByUserWithoutSave(user.User.Guid, paymentId);
            
            await _db.SaveChangesAsync();
        }
        
        public async Task UpdateDayPaymentsByUserWithoutSave(Guid userId, Guid paymentId = default)
        {
            var user = await _db.GetUserAsync(userId);

            foreach (var att in user.Attendance.Where(a => a.PaymentAmount <= 0.00001).OrderBy(x => x.Date))
            {
                bool resultCharging;
                
                // ReSharper disable once AssignmentInConditionalExpression
                if (resultCharging = await _accountManagementService.DecreaseAmount(user.Guid, att.Group.Cost, att.Dept))
                    att.PaymentAmount = att.Group.Cost;
                att.Dept = !resultCharging;
                att.AfterPayment = paymentId;
                
                _db.Update(att);
            }
        }
        
        public async Task CancelUpdate(Guid userId, Guid paymentId)
        {
            var user = await _db.GetUserAsync(userId);

            foreach (var att in user.Attendance.Where(a => a.AfterPayment == paymentId).OrderBy(x => x.Date))
            {
                await _accountManagementService.IncreaseAmount(user.Guid, att.PaymentAmount);
                if (att.)
                att.Dept = false;
            }
            
            await _db.SaveChangesAsync();
        }
    }
}