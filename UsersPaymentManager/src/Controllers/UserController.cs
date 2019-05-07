using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UsersPaymentManager.Database;
using UsersPaymentManager.Database.Entities;
using UsersPaymentManager.Models;
using UsersPaymentManager.Services;

namespace UsersPaymentManager.Controllers
{
    [Route("/students")]
    public class UserController : Controller
    {
        private readonly IUserManagementService _service;

        public UserController(IUserManagementService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<UserResponse> GetUser([FromRoute] Guid id) =>
            await _service.GetUser(id);

        [HttpPost]
        public async Task<UserResponse> CreateUser([FromBody] UserModel request) =>
            await _service.CreateUser(request);

        [HttpPut("{id}")]
        public void UpdateUser([FromRoute] Guid id, [FromBody] UserModel request) =>
            _service.UpdateUser(id, request);

        [HttpDelete("{id}")]
        public async Task DeleteUser([FromRoute] Guid id) =>
            await _service.DeleteUser(id);

        [HttpPost("assign")]
        public async Task AssignUserToGroup([FromBody] AssignUserToGroupRequest request) =>
            await _service.AssignUserToGroup(request.UserId, request.GroupId);

        [HttpDelete("assign")]
        public async Task RemoveUserFromGroup([FromBody] AssignUserToGroupRequest request) =>
            await _service.RemoveUserFromGroup(request.UserId, request.GroupId);
    }
}