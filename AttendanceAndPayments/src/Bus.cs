using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;
using Storage;

namespace AttendanceAndPayments
{
    public interface IBus
    {
        Task Transform(IDictionary<int, float> deptChanges);
        Task Notify(IEnumerable<int> userIds);
    }
    
    public class Bus: IBus
    {
        private readonly IDatabaseCache _cache;
        private readonly IAttendanceService _attendanceService;
        private readonly IAccountManagementService _account;
        
        public Bus(IDatabaseCache cache, IAttendanceService attendanceService, IAccountManagementService account)
        {
            _cache = cache;
            _attendanceService = attendanceService;
            _account = account;
        }
        
        public async Task Transform(IDictionary<int, float> deptChanges)
        {
            foreach (var (userId, amount) in deptChanges)
            {
                var acc = _cache.GetUser(userId).Account;
                acc.Dept += amount;
            }

            await _cache.UpdateUsers();
            await Notify(deptChanges.Keys);
        }

        public async Task Notify(IEnumerable<int> userIds)
        {
            IDictionary<int, float> deptChanges = new Dictionary<int, float>();
            
            foreach (var userId in userIds)
            {
                var res = await _account.PayDeptOff(userId);
                if (res > 0)
                    deptChanges[userId] = res;
            }

            await _attendanceService.Transform(deptChanges);
        }
    }
}