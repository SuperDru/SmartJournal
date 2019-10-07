using System.Collections.Generic;
using System.Threading.Tasks;
using Common;

namespace StudentsSystem
{
    public static class AccountExtensions
    {
        public static async Task Transform(this ICacheRepository cache, IDictionary<int, float> deptChanges)
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

            return deptChanges;
        }
    }
}