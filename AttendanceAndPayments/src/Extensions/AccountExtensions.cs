using System.Collections.Generic;
using System.Threading.Tasks;
using Storage;

namespace AttendanceAndPayments
{
    public static class AccountExtensions
    {
        public static async Task Transform(this IDatabaseCache cache, IDictionary<int, float> deptChanges)
        {
            foreach (var (userId, amount) in deptChanges)
            {
                var acc = cache.GetUser(userId).Account;
                acc.Dept += amount;
            }

            await cache.UpdateUsers();
        }
        
        public static async Task<IDictionary<int, float>> Notify(this IAccountManagementService account, IEnumerable<int> userIds)
        {
            IDictionary<int, float> deptChanges = new Dictionary<int, float>();
            
            foreach (var userId in userIds)
            {
                var res = await account.PayDeptOff(userId);
                if (res > 0)
                    deptChanges[userId] = res;
            }

            return deptChanges.Count == 0 ? null : deptChanges;
        }
    }
}