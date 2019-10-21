using System;
using System.Collections.Generic;
using System.Linq;
using Common;
using Microsoft.AspNetCore.Mvc;

namespace StudentsSystem
{
    [Route("account/history")]
    public class AccountHistoryController: Controller
    {
        private const int ShiftCount = 20;

        private readonly ICacheRepository _cache;

        public AccountHistoryController(ICacheRepository cache)
        {
            _cache = cache;
        }

        /// <summary>
        /// Returns account history of user with {userId} and {step} from 0, 1, 2 ... (amount of entries = (step + 1) * ShiftCount (default = 20) ) 
        /// </summary>
        [HttpGet("{userId:Guid}/{step}")]
        public ICollection<AccountHistoryResponse> GetAccountHistory([FromRoute] Guid userId, [FromRoute] int step)
        {
            var user = _cache.GetExistingUser(userId);
            return user.AccountHistory
                .Skip(step * ShiftCount)
                .Take(ShiftCount)
                .Select(x => x.ToAccountHistoryResponse())
                .OrderByDescending(x => x.PerformedAt)
                .ToList();
        }
        
        /// <summary>
        /// Returns account history of user with {userId} from {from} to {to} date
        /// </summary>
        [HttpGet("{userId:Guid}")]
        public ICollection<AccountHistoryResponse> GetAccountHistory([FromRoute] Guid userId, [FromQuery] DateTime from, [FromQuery] DateTime to)
        {
            var user = _cache.GetExistingUser(userId);
            return user.AccountHistory
                .Where(x => x.PerformedAt >= from && x.PerformedAt <= to)
                .Select(x => x.ToAccountHistoryResponse())
                .OrderByDescending(x => x.PerformedAt)
                .ToList();
        }
    }
}