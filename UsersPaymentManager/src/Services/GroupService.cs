using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using UsersPaymentManager.Database;
using UsersPaymentManager.Database.Entities;
using UsersPaymentManager.Models;

namespace UsersPaymentManager.Services
{
    public interface IGroupService
    {
        Task<ICollection<Group>> GetGroups();
        Task<List<UserOfGroupAttendanceResponse>> GetAttendanceOfGroup(string name, DateTime start, DateTime end);
        Task<List<UserOfGroupAttendanceResponse>> ChangeAttendanceOfGroup(string name, IEnumerable<UserOfGroupAttendanceRequest> changedDays);
    }

    public class GroupService: IGroupService
    {
        private readonly DatabaseContext _db;
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;


        public GroupService(DatabaseContext db, IAccountService accountService, IMapper mapper)
        {
            _db = db;
            _accountService = accountService;
            _mapper = mapper;
        }

        public async Task<ICollection<Group>> GetGroups()
        {
            return await _db.GetGroupsAsync();
        }

        public async Task<List<UserOfGroupAttendanceResponse>> GetAttendanceOfGroup(string name, DateTime start, DateTime end)
        {
            throw new NotImplementedException();
        }

        public async Task<List<UserOfGroupAttendanceResponse>> ChangeAttendanceOfGroup(string name, IEnumerable<UserOfGroupAttendanceRequest> changedDays)
        {
            throw new NotImplementedException();
        }

//        public async Task<List<UserOfGroupAttendanceResponse>> GetAttendanceOfGroup(string name, DateTime start, DateTime end)
//        {
//            var group = await _db.GetGroupAsync(name);
//            var users = group.Users;
//
//            return (from user in users
//                let account = user.User.Account
//                let days = user.User.Attendance.Where(a => a.Date >= start && a.Date <= end)
//                select new UserOfGroupAttendanceResponse()
//                {
//                    Id = user.UserId,
//                    UserProfile = _mapper.Map<UserProfile>(user),
//                    UserDays = days.Select(d => new UserDayInfoResponse() {Date = d.Date, IsAttended = d.IsAttended, IsPaid = d.PaymentAmount > 0}).ToList(),
//                    AccountAmount = account.Amount,
//                    Dept = account.Dept
//                }).ToList();
//        }
//
//        public async Task<List<UserOfGroupAttendanceResponse>> ChangeAttendanceOfGroup(string name, IEnumerable<UserOfGroupAttendanceRequest> changedDays)
//        {
//            DateTime startDate = DateTime.MaxValue, endDate = DateTime.MinValue;
//
//            var group = _db.GetGroupAsync(name);
//
//            foreach (var userAttendance in changedDays)
//            {
//                var user = await _db.GetUserAsync(userAttendance.UserId);
//
//                var newDays = userAttendance.ChangedUserDays.OrderBy(d => d.Date).ToList();
//
//                var s = newDays.First().Date;
//                var e = newDays.Last().Date;
//
//                startDate = s < startDate ? s : startDate;
//                endDate = e > endDate ? e : endDate;
//
//                var oldDays = user.Attendance
//                    .Where(a => a.Date >= s && a.Date <= e)
//                    .ToDictionary(od => od.Date, od => od);
//
//                var i = 0;
//
//                if (oldDays.Count > 0)
//                {
//                    var maxOldDate = oldDays.Keys.Max();
//
//                    for (i = 0; i < newDays.Count && newDays[i].Date <= maxOldDate; i++)
//                    {
//                        // check oldDays[day.Date] != null
//
//                        var oldDay = oldDays[newDays[i].Date];
//
//                        if (oldDay.IsAttended == newDays[i].IsAttended) continue;
//
//                        if (oldDay.IsAttended && !newDays[i].IsAttended)
//                            await _accountService.IncreaseAmount(oldDay.UserId, oldDay.PaymentAmount);
//
//                        var attend = user.Attendance.First(a => a.Date == oldDay.Date);
//                        attend.PaymentAmount = 0;
//                        attend.Dept = false;
//                        attend.IsAttended = !oldDay.IsAttended;
//                    }
//                }
//
//                for (var j = i; j < newDays.Count; j++)
//                {
//                    user.Attendance.Add(new Attendance()
//                    {
//                        Dept = false,
//                        UserId = user.Id,
//                        PaymentAmount = 0,
//                        GroupId = group.Id,
//                        Date = newDays[j].Date,
//                        IsAttended = newDays[j].IsAttended
//                    });
//                }
//
//                await UpdateDayPayments(name);
//            }
//
//            return await GetAttendanceOfGroup(name, startDate, endDate);
//        }
//
//        private async Task UpdateDayPayments(string name)
//        {
//            var group = await _db.GetGroupAsync(name);
//
//            var users = group.Users;
//
//            foreach (var user in users)
//            {
//                foreach (var att in user.User.Attendance.Where(a => a.IsAttended && a.PaymentAmount <= 0.001))
//                {
//                    if (!await _accountService.DecreaseAmount(att.UserId, group.Cost, att.Dept)) {
//                        att.Dept = true;
//                        break;
//                    }
//
//                    att.PaymentAmount = 350;
//                    att.Dept = false;
//                }
//            }
//        }
    }
}