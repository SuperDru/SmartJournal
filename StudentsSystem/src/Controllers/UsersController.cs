using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Storage;

namespace StudentsSystem
{
    /// <inheritdoc />
    [Route("/users")]
    public class UsersController: Controller
    {
        private readonly IDatabaseCache _cache;

        /// <inheritdoc />
        public UsersController(IDatabaseCache cache)
        {
            _cache = cache;
        }
        
        /// <summary>
        /// Returns user with {userId}
        /// </summary>
        [HttpGet("{userId}")]
        public UserResponse GetUser([FromRoute] Guid userId) =>
            _cache.GetUser(userId).ToUserResponse();

        /// <summary>
        /// Returns list of users
        /// </summary>
        [HttpGet]
        public ICollection<UserResponse> GetUsers() =>
            _cache.GetUsers().Select(x => x.ToUserResponse()).ToList();

        /// <summary>
        /// Creates new user. 
        /// Returns user with guid
        /// </summary>
        [HttpPost]
        public async Task<UserResponse> CreateUser([FromBody] UserModel request)
        {
            var user = request.ToUser();
            await _cache.AddUser(user);
            
            return _cache.GetUser(user.Guid).ToUserResponse();
        }

        /// <summary>
        /// Rewrites information about the user with {userId}. 
        /// Returns user with updated information
        /// </summary>
        [HttpPut("{userId}")]
        public async Task<UserResponse> UpdateUser([FromRoute] Guid userId, [FromBody] UserModel request)
        {
            var user = _cache.GetUser(userId);

            await _cache.AddOrUpdateUser(request.ToUser(user));
            
            return _cache.GetUser(user.Guid).ToUserResponse();
        }

        /// <summary>
        /// Deletes the users with {userId}
        /// </summary>
        [HttpDelete("{userId}")]
        public async Task DeleteUser([FromRoute] Guid userId) =>
            await _cache.RemoveUser(userId);

        /// <summary>
        /// Adds user with {userId} or users with {userIds} to group with {groupId}
        /// </summary>
        [HttpPost("assign")]
        public async Task AssignUserToGroup([FromBody] AssignUserToGroupRequest request)
        {
            var group = _cache.GetGroup(request.GroupId);

            if (request.UserId != null && request.UserIds == null)
                request.UserIds = new List<Guid> {request.UserId.Value};
            
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

        /// <summary>
        /// Removes user with {userId} or users with {userIds} from group with {groupId}
        /// </summary>
        [HttpDelete("assign")]
        public async Task RemoveUserFromGroup([FromBody] AssignUserToGroupRequest request)
        {
            var group = _cache.GetGroup(request.GroupId);
            
            if (request.UserId != null && request.UserIds == null)
                request.UserIds = new List<Guid> {request.UserId.Value};
            
            foreach (var userId in request.UserIds)
            {
                var user = _cache.GetUser(userId);
                
                user.Groups.RemoveAll(x => x.GroupId == group.Id && x.UserId == user.Id); 
            }


            await _cache.UpdateUsers();
        }
    }
}