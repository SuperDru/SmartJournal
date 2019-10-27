using System;
using System.Collections.Generic;
using System.Linq;
using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Serilog;
using ILogger = Microsoft.Extensions.Logging.ILogger;

namespace StudentsSystem
{
    [Route("account/history")]
    public class AccountHistoryController: Controller
    {
        private const int ShiftCount = 20;

        private readonly ICacheRepository _cache;
        private readonly ILogger<AccountHistoryController> _logger;

        public AccountHistoryController(ICacheRepository cache, ILogger<AccountHistoryController> logger)
        {
            _cache = cache;
            _logger = logger;
        }

        /// <summary>
        /// Returns account history of user with {userId} and {step} from 0, 1, 2 ... (amount of entries = (step + 1) * ShiftCount (default = 20) ) 
        /// </summary>
        [HttpGet("{userId:Guid}/{step}")]
        public ICollection<AccountHistoryResponse> GetAccountHistory([FromRoute] Guid userId, [FromRoute] int step)
        {
            var user = _cache.GetExistingUser(userId);
            
            _logger.LogInformation("Return account history of user with id {userId}, step = {step}", userId, step);
            
            return user.AccountHistory
                .OrderByDescending(x => x.PerformedAt)
                .Skip(step * ShiftCount)
                .Take(ShiftCount)
                .Select(x => x.ToAccountHistoryResponse())
                .ToList();
        }
        
        /// <summary>
        /// Returns account history of user with {userId} from {from} to {to} date
        /// </summary>
        [HttpGet("{userId:Guid}")]
        public ICollection<AccountHistoryResponse> GetAccountHistory([FromRoute] Guid userId, [FromQuery] DateTime from, [FromQuery] DateTime to)
        {
            var user = _cache.GetExistingUser(userId);
            
            _logger.LogInformation("Return account history of user with id {userId} from {from} to {to} date", userId, from, to);
            
            return user.AccountHistory
                .OrderByDescending(x => x.PerformedAt)
                .Where(x => x.PerformedAt >= from && x.PerformedAt <= to)
                .Select(x => x.ToAccountHistoryResponse())
                .ToList();
        }
    }
}