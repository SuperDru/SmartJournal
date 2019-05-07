using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UsersPaymentManager.Database.Entities;
using UsersPaymentManager.Models;
using UsersPaymentManager.Services;

namespace UsersPaymentManager.Controllers
{
    [Route("/groups")]
    public class GroupController: Controller
    {
        private readonly IGroupManagementService _groupService;
        private readonly IUserManagementService _userService;
        private readonly IScheduleManagementService _scheduleService;

        public GroupController(IGroupManagementService groupService, IUserManagementService userService, IScheduleManagementService scheduleService)
        {
            _groupService = groupService;
            _userService = userService;
            _scheduleService = scheduleService;
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
        public void UpdateGroup([FromRoute] Guid id, [FromBody] GroupModel request) =>
            _groupService.UpdateGroup(id, request);

        [HttpDelete("{id}")]
        public async Task DeleteGroup([FromRoute] Guid id) =>
            await _groupService.DeleteGroup(id);


        [HttpGet("{id}/users")]
        public async Task<ICollection<UserResponse>> GetUsers([FromRoute] Guid id) =>
            await _userService.GetUsers(id);

        [HttpGet("{id}/schedule")]
        public async Task<ICollection<TrueScheduleModel>> GetSchedule([FromRoute] Guid id, [FromQuery] DateTime from, [FromQuery] DateTime to) =>
            await _scheduleService.GetTrueSchedule(id, from, to);
//
//        [HttpGet("{name}")]
//        public async Task<List<UserProfile>> GetUsersOfGroup([FromRoute] string name)
//        {
//
//        }
//
//        [HttpGet("{name}/attendance")]
//        public async Task<List<UserOfGroupAttendanceResponse>> GetAttendanceOfGroup([FromRoute] string name, [FromQuery] string fromDate, [FromQuery] string toDate)
//        {
//            var startDate = DateTime.ParseExact(fromDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
//            var endDate = DateTime.ParseExact(toDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
//            return await _groupService.GetAttendanceOfGroup(name, startDate, endDate);
//        }
//
//        [HttpPost("{name}/attendance")]
//        public async Task<List<UserOfGroupAttendanceResponse>> ChangeAttendanceOfGroup([FromRoute] string name, [FromBody] List<UserOfGroupAttendanceRequest> changedDays)
//        {
//            return await _groupService.ChangeAttendanceOfGroup(name, changedDays);
//        }
//
//        [HttpPost("{name}/add/{id}")]
//        public async Task AddUser([FromRoute(Name = "name")] string groupName, [FromRoute] int userId)
//        {
//
//        }
//
//        [HttpPost("{name}/remove/{id}")]
//        public async Task RemoveUser([FromRoute(Name = "name")] string groupName, [FromRoute] int userId)
//        {
//
//        }
//
//        [HttpPost("{name}/rename")]
//        public async Task ChangeGroupName([FromRoute(Name = "name")] string groupName, [FromBody] string name)
//        {
//
//        }
//
//        [HttpPost("create")]
//        public async Task CreateGroup([FromBody] string name)
//        {
//
//        }
//
//        [HttpPost("{name}/remove")]
//        public async Task RemoveGroup()
//        {
//
//        }
    }
}