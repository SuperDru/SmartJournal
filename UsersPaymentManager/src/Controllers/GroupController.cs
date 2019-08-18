using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Storage;
using UsersPaymentManager.Models;
using UsersPaymentManager.Services;

namespace UsersPaymentManager.Controllers
{
    [Route("/groups")]
    public class GroupController: Controller
    {
        private readonly IGroupManagementService _groupService;
        private readonly IUserManagementService _userService;

        public GroupController(IGroupManagementService groupService, IUserManagementService userService)
        {
            _groupService = groupService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<ICollection<GroupResponse>> GetGroups() =>
            await _groupService.GetGroups();

        [HttpGet("{id}")]
        public async Task<GroupModel> GetGroup([FromRoute] Guid id) =>
            await _groupService.GetGroup(id);

        [HttpPost]
        public async Task<GroupResponse> CreateGroup([FromBody] GroupModel request) =>
            await _groupService.CreateGroup(request);

        [HttpPut("{id}")]
        public async Task UpdateGroup([FromRoute] Guid id, [FromBody] GroupModel request) =>
            await _groupService.UpdateGroup(id, request);

        [HttpDelete("{id}")]
        public async Task DeleteGroup([FromRoute] Guid id) =>
            await _groupService.DeleteGroup(id);
        
        [HttpGet("{id}/users")]
        public async Task<ICollection<UserResponse>> GetUsers([FromRoute] Guid id) =>
            await _userService.GetUsers(id);
    }
}