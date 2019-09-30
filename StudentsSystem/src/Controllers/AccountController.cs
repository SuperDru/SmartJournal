using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Common;

namespace StudentsSystem
{
    [Route("accounts")]
    public class AccountController: Controller
    {
        private readonly IDatabaseCache _cache;

        public AccountController(IDatabaseCache cache)
        {
            _cache = cache;
        }
        
        /// <summary>
        /// Returns account of the user with {userId}
        /// </summary>
        [HttpGet("user/{userId}")]
        public AccountResponse GetAccount([FromRoute] Guid userId)
        {
            var acc = _cache.GetExistingUser(userId).Account;
            var amount = acc.Amount > 0 ? acc.Amount : 0;
            var dept = acc.Dept - acc.Amount > 0 ? acc.Dept - acc.Amount : 0;
            
            return new AccountResponse
            {
                UserId = userId,
                Amount = amount,
                Dept = dept,
                UpdatedAt = acc.UpdatedAt
            };
        }
        
        /// <summary>
        /// Returns users accounts of the group with {groupId}
        /// </summary>
        [HttpGet("group/{groupId}")]
        public ICollection<AccountResponse> GetAccounts([FromRoute] Guid groupId)
        {
            var group = _cache.GetExistingGroup(groupId);

            return group.Users.Select(x =>
            {
                var acc = _cache.GetExistingUser(x.User.Guid).Account;
                var amount = acc.Amount > 0 ? acc.Amount : 0;
                var dept = acc.Dept - acc.Amount > 0 ? acc.Dept - acc.Amount : 0;
            
                return new AccountResponse
                {
                    UserId = x.User.Guid,
                    Amount = amount,
                    Dept = dept,
                    UpdatedAt = acc.UpdatedAt
                }; 
            }).ToList();
        }
    }
}