using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common;
using Microsoft.AspNetCore.Mvc;

namespace StudentsSystem
{
    [Route("account/history")]
    public class AccountHistoryController: Controller
    {
        private readonly ICacheRepository _cache;

        public AccountHistoryController(ICacheRepository cache)
        {
            _cache = cache;
        }

        /// <summary>
        /// Returns account history of user with {userId}
        /// </summary>
        [HttpGet("{userId:Guid}")]
        public ICollection<AccountHistoryResponse> GetAccountHistory([FromRoute] Guid userId)
        {
            var user = _cache.GetExistingUser(userId);
            return user.AccountHistory.Select(x => x.ToAccountHistoryResponse()).ToList();
        }
    }
}