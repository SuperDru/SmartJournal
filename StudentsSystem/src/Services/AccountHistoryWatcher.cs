using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common;

namespace StudentsSystem
{
    public interface IAccountHistoryWatcher
    {
        void StartWatch(ICollection<Guid> userIds, OperationType type);
        Task StopWatch();
    }
    
    public class AccountHistoryWatcher: IAccountHistoryWatcher
    {
        private readonly ICacheRepository _cache;
        private readonly IDictionary<int, float> _startAmounts;
        private OperationType _type;

        public AccountHistoryWatcher(ICacheRepository cache)
        {
            _cache = cache;
            _startAmounts = new Dictionary<int, float>();
        }
        
        public void StartWatch(ICollection<Guid> userIds, OperationType type)
        {
            _type = type;
            
            var users = _cache.GetUsers().Where(x => userIds.Contains(x.Guid));

            foreach (var user in users)
            {
                var amount = user.Account.Amount;
                var dept = user.Account.Dept;
                
                var userAmount = amount - dept;
                
                _startAmounts[user.Id] = userAmount;
            }
        }

        public async Task StopWatch()
        {
            var date = DateTime.Now;
            
            foreach (var id in _startAmounts.Keys)
            {
                var user = _cache.GetUser(id);
                
                var amount = user.Account.Amount;
                var dept = user.Account.Dept;

                var userAmount = amount - dept;
                
                if (Math.Abs(userAmount - _startAmounts[id]) < 0.00001)
                    continue;

                user.AccountHistory.Add(new AccountHistory
                {
                    PerformedAt = date,
                    Type = _type,
                    DiffAmount = userAmount - _startAmounts[id],
                    NewAmount = userAmount,
                });
            }

            await _cache.UpdateUsers();
        }
    }
}