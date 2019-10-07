using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Common;

namespace StudentsSystem
{
    /// <inheritdoc />
    [Route("/users")]
    public class UsersController: Controller
    {
        private readonly ICacheRepository _cache;

        /// <inheritdoc />
        public UsersController(ICacheRepository cache)
        {
            _cache = cache;
        }
        
        /// <summary>
        /// Returns user with {userId}
        /// </summary>
        [HttpGet("{userId:Guid}")]
        public UserResponse GetUser([FromRoute] Guid userId) =>
            _cache.GetExistingUser(userId).ToUserResponse();

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
            
            if (_cache.GetUsers().Any(x => x.Email == user.Email))
                Errors.UserWithThisEmailExistsError.Throw(StatusCodes.Status403Forbidden);
            
            if (_cache.GetUsers().Any(x => x.PhoneNumber == user.PhoneNumber))
                Errors.UserWithThisPhoneExistsError.Throw(StatusCodes.Status403Forbidden);
            
            await _cache.AddUser(user);
            
            return _cache.GetUser(user.Guid).ToUserResponse();
        }

        /// <summary>
        /// Rewrites information about the user with {userId}. 
        /// Returns user with updated information
        /// </summary>
        [HttpPut("{userId:Guid}")]
        public async Task<UserResponse> UpdateUser([FromRoute] Guid userId, [FromBody] UserModel request)
        {
            var user = _cache.GetExistingUser(userId);

            if (user.Email != request.Email && _cache.GetUsers().Any(x => x.Email == request.Email))
                Errors.UserWithThisEmailExistsError.Throw(StatusCodes.Status403Forbidden);
            
            if (user.PhoneNumber != request.PhoneNumber && _cache.GetUsers().Any(x => x.PhoneNumber == request.PhoneNumber))
                Errors.UserWithThisPhoneExistsError.Throw(StatusCodes.Status403Forbidden);
            
            await _cache.AddOrUpdateUser(request.ToUser(user));
            
            return _cache.GetUser(user.Guid).ToUserResponse();
        }

        /// <summary>
        /// Deletes the users with {userId}
        /// </summary>
        [HttpDelete("{userId:Guid}")]
        public async Task DeleteUser([FromRoute] Guid userId)
        {
            // Check that user exists
            _cache.GetExistingUser(userId);
            await _cache.RemoveUser(userId);
        }

        /// <summary>
        /// Adds user with {userId} or users with {userIds} to group with {groupId}
        /// </summary>
        [HttpPost("assign")]
        public async Task AssignUserToGroup([FromBody] AssignUserToGroupRequest request)
        {
            if (request.UserId == null && request.UserIds == null || request.UserIds != null && request.UserIds.Count == 0)
                Errors.ValidationError("Fields UserId or UserIds must not be null or empty.").Throw(StatusCodes.Status400BadRequest);
            
            var group = _cache.GetExistingGroup(request.GroupId);

            if (request.UserId != null && request.UserIds == null)
                request.UserIds = new List<Guid> {request.UserId.Value};
            
            // ReSharper disable once PossibleNullReferenceException
            foreach (var userId in request.UserIds)
            {
                var user = _cache.GetExistingUser(userId);
            
                if (user.Groups.Any(x => x.GroupId == group.Id && x.UserId == user.Id))
                    Errors.UserAlreadyAssignedToGroupError(user).Throw(StatusCodes.Status403Forbidden);
                
                group.Users.Add(new UserGroup
                {
                    UserId = user.Id
                });
            }

            try
            {
                await _cache.UpdateGroups();
            }
            catch (Exception e)
            {
                // ignored
            }
        }

        /// <summary>
        /// Removes user with {userId} or users with {userIds} from group with {groupId}
        /// </summary>
        [HttpDelete("assign")]
        public async Task RemoveUserFromGroup([FromBody] AssignUserToGroupRequest request, [FromServices] DatabaseContext db)
        {
            if (request.UserId == null && request.UserIds == null || request.UserIds != null && request.UserIds.Count == 0)
                Errors.ValidationError("Fields UserId or UserIds must not be null or empty.").Throw(StatusCodes.Status400BadRequest);
            
            var group = _cache.GetExistingGroup(request.GroupId);
            
            if (request.UserId != null && request.UserIds == null)
                request.UserIds = new List<Guid> {request.UserId.Value};
            
            // ReSharper disable once PossibleNullReferenceException
            foreach (var userId in request.UserIds)
            {
                var user = _cache.GetExistingUser(userId);
                
                if (user.Groups.All(x => !(x.GroupId == group.Id && x.UserId == user.Id)))
                    Errors.UserAlreadyRemovedFromGroupError(user).Throw(StatusCodes.Status403Forbidden);
                
                user.Groups.RemoveAll(x => x.GroupId == group.Id && x.UserId == user.Id); 
            }
            
            await _cache.UpdateUsers();
        }
    }
}