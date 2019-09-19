using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Storage;

namespace StudentsSystem
{
    [Route("/users")]
    public class UsersController: Controller
    {
        private readonly IDatabaseCache _cache;
        
        public UsersController(IDatabaseCache cache)
        {
            _cache = cache;
        }
        
        [HttpGet("{userId}")]
        public UserResponse GetUser([FromRoute] Guid userId) =>
            _cache.GetUser(userId).ToUserResponse();

        [HttpGet]
        public ICollection<UserResponse> GetUsers() =>
            _cache.GetUsers().Select(x => x.ToUserResponse()).ToList();

        [HttpPost]
        public async Task<UserResponse> CreateUser([FromBody] UserModel request)
        {
            var user = request.ToUser();
            await _cache.AddUser(user);
            
            return _cache.GetUser(user.Guid).ToUserResponse();
        }

        [HttpPut("{userId}")]
        public async Task UpdateUser([FromRoute] Guid userId, [FromBody] UserModel request)
        {
            var user = _cache.GetUser(userId);

            await _cache.AddOrUpdateUser(request.ToUser(user));
        }

        [HttpDelete("{userId}")]
        public async Task DeleteUser([FromRoute] Guid userId) =>
            await _cache.RemoveUser(userId);

        [HttpPost("assign")]
        public async Task AssignUserToGroup([FromBody] AssignUserToGroupRequest request)
        {
            var group = _cache.GetGroup(request.GroupId);

            foreach (var userId in request.UserIds)
            {
                var user = _cache.GetUser(userId);
            
                user.Groups.Add(new UserGroup
                {
                    GroupId = group.Id,
                    UserId = user.Id
                });   
            }

            await _cache.UpdateUsers();
        }

        [HttpDelete("assign")]
        public async Task RemoveUserFromGroup([FromBody] AssignUserToGroupRequest request)
        {
            var group = _cache.GetGroup(request.GroupId);
            
            foreach (var userId in request.UserIds)
            {
                var user = _cache.GetUser(userId);
                
                user.Groups.RemoveAll(x => x.GroupId == group.Id && x.UserId == user.Id); 
            }


            await _cache.UpdateUsers();
        }
    }
}