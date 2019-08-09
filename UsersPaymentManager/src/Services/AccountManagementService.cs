using System;
using System.Threading.Tasks;
using UsersPaymentManager.Database;

namespace UsersPaymentManager.Services
{
    public interface IAccountManagementService
    {
        Task IncreaseAmount(Guid userId, float value);
        Task<bool> DecreaseAmount(Guid userId, float value, bool dept);
    }

    public class AccountManagementService: IAccountManagementService
    {
        private readonly DatabaseContext _db;


        public AccountManagementService(DatabaseContext db)
        {
            _db = db;
        }

        public async Task IncreaseAmount(Guid userId, float value)
        {
            var account = (await _db.GetUserAsync(userId)).Account;

            account.Amount += value;
            account.Dept = account.Dept - value < 0 ? 0 : account.Dept - value;
            account.UpdatedAt = DateTime.Now;

            _db.Accounts.Update(account);
            await _db.SaveChangesAsync();
        }

        public async Task<bool> DecreaseAmount(Guid userId, float value, bool dept)
        {
            bool result;

            var account = (await _db.GetUserAsync(userId)).Account;

            float newAmount, newDept;

            if (account.Dept > 0 && dept)
                return false;

            if (account.Dept > 0)
            {
                newDept = account.Dept + value;
                newAmount = account.Amount;
                result = false;
            }
            else if (account.Amount - value >= 0)
            {
                newDept = 0;
                newAmount = account.Amount - value;
                result = true;
            }
            else
            {
                newDept = MathF.Abs(account.Amount - value);
                newAmount = account.Amount;
                result = false;
            }

            account.Amount = newAmount;
            account.Dept = newDept;
            account.UpdatedAt = DateTime.Now;
            
            _db.Accounts.Update(account);
            await _db.SaveChangesAsync();
            
            return result;
        }
    }
}