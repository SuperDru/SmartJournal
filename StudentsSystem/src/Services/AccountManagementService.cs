using System;
using System.Threading.Tasks;
using Common;

namespace StudentsSystem
{
    public interface IAccountManagementService
    {
        Task Deposit(Guid userId, float amount);
        Task<float> PayDeptOff(int userId);
    }
    
    public class AccountManagementService: IAccountManagementService
    {
        private readonly IDatabaseCache _cache;

        public AccountManagementService(IDatabaseCache cache)
        {
            _cache = cache;
        }


        /// <summary>
        /// Changes an amount of user with userId by amount (can be negative)
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="amount"></param>
        /// <returns></returns>
        public async Task Deposit(Guid userId, float amount)
        {
            var user = _cache.GetUser(userId);

            user.Account.Amount += amount;
            user.Account.UpdatedAt = DateTime.Now;
            
            await _cache.AddOrUpdateUser(user);
        }

        public async Task<float> PayDeptOff(int userId)
        {
            var user = _cache.GetUser(userId);
            var account = user.Account;

            var res = 0f;

            if (account.Dept < 0.00001 || account.Dept > 0 && account.Amount < 0) return res;
            
            res = MathF.Min(account.Amount, account.Dept);
            account.Amount -= res;
            account.Dept -= res;
            account.UpdatedAt = DateTime.Now; 

            await _cache.AddOrUpdateUser(user);
            return res;
            
        }
    }
}