using System.Collections.Generic;
using System.Threading.Tasks;
using Common;
using Microsoft.Extensions.Logging;

namespace StudentsSystem
{
    public static class AccountExtensions
    {
        public static async Task Transform(this ICacheRepository cache, IDictionary<int, float> deptChanges, ILogger logger = null)
        {
            foreach (var (userId, amount) in deptChanges)
            {
                var acc = cache.GetUser(userId).Account;
                acc.Dept += amount;

                logger?.LogInformation("Inner dept of user with id {id} increased on {amount}", userId, amount);
            }

            await cache.UpdateUsers();
        }
        
        public static async Task<IDictionary<int, float>> Notify(this IAccountManagementService account, IEnumerable<int> userIds, ILogger logger = null)
        {
            IDictionary<int, float> deptChanges = new Dictionary<int, float>();
            
            foreach (var userId in userIds)
            {
                var res = await account.PayDeptOff(userId);
                if (res > 0)
                    deptChanges[userId] = res;
                
                logger?.LogInformation("Paid off dept = {amount}", res);
            }

            return deptChanges;
        }
    }
}