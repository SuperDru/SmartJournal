using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using UsersPaymentManager.Database;
using UsersPaymentManager.Database.Entities;
using UsersPaymentManager.Models;

namespace UsersPaymentManager.Services
{
    public interface IAccountService
    {
        Task<AccountInfo> GetAccountInfo(int userId);
        Task IncreaseAmount(int userId, float value);
        Task<bool> DecreaseAmount(int userId, float value, bool dept);
    }

    public class AccountService: IAccountService
    {
        public async Task<AccountInfo> GetAccountInfo(int userId)
        {
            throw new NotImplementedException();
        }

        public async Task IncreaseAmount(int userId, float value)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DecreaseAmount(int userId, float value, bool dept)
        {
            throw new NotImplementedException();
        }

//        private readonly IDbConnectionFactory _db;
//        private readonly IMapper _mapper;
//
//
//        public AccountService(IDbConnectionFactory db, IMapper mapper)
//        {
//            _db = db;
//            _mapper = mapper;
//        }
//
//        public async Task<AccountInfo> GetAccountInfo(int userId)
//        {
//            using (var con = _db.CreateConnection())
//            {
//                const string sql = "select * from accounts where user_id=@Id";
//                var account = (await con.QueryAsync<Account>(sql, new {Id = userId})).FirstOrDefault();
//                return _mapper.Map<AccountInfo>(account);
//            }
//        }
//
//        public async Task IncreaseAmount(int userId, float value)
//        {
//            var account = await GetAccountInfo(userId);
//
//            var newAmount = account.Amount + value;
//            var newDept = account.Dept - value < 0 ? 0 : account.Dept - value;
//
//            await UpdateAccountData(userId, newAmount, newDept);
//        }
//
//        public async Task<bool> DecreaseAmount(int userId, float value, bool dept)
//        {
//            bool result;
//
//            var account = await GetAccountInfo(userId);
//
//            float newAmount, newDept;
//
//            if (account.Dept > 0 && dept)
//                return false;
//
//            if (account.Dept > 0)
//            {
//                newDept = account.Dept + value;
//                newAmount = account.Amount;
//                result = false;
//            }
//            else if (account.Amount - value >= 0)
//            {
//                newDept = 0;
//                newAmount = account.Amount - value;
//                result = true;
//            }
//            else
//            {
//                newDept = MathF.Abs(account.Amount - value);
//                newAmount = account.Amount;
//                result = false;
//            }
//
//            await UpdateAccountData(userId, newAmount, newDept);
//            return result;
//        }
//
//        private async Task UpdateAccountData(int userId, float amount, float dept)
//        {
//            var date = DateTime.Now;
//            using (var con = _db.CreateConnection())
//            {
//                const string sql = "update accounts set amount = @Amount, dept = @Dept, updated_at = @Date where user_id = @Id";
//
//                await con.ExecuteAsync(sql, new {Amount = amount, Dept = dept, Date = date, Id = userId});
//            }
//        }
    }
}