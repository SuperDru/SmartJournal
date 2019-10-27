using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Common;
using Microsoft.Extensions.Logging;
using Serilog;

namespace StudentsSystem
{
    [Route("/users")]
    public class UsersController: Controller
    {
        private readonly ICacheRepository _cache;
        private readonly ILogger<UsersController> _logger;

        /// <inheritdoc />
        public UsersController(ICacheRepository cache, ILogger<UsersController> logger)
        {
            _cache = cache;
            _logger = logger;
        }

        /// <summary>
        /// Returns user with {userId}
        /// </summary>
        [HttpGet("{userId:Guid}")]
        public UserResponse GetUser([FromRoute] Guid userId)
        {
            var user = _cache.GetExistingUser(userId).ToUserResponse();

            _logger.LogInformation("Return user with id {id}", user.Guid);
            
            return user;
        }

        /// <summary>
        /// Returns list of users
        /// </summary>
        [HttpGet]
        public ICollection<UserResponse> GetUsers()
        {
            var users = _cache.GetUsers().Select(x => x.ToUserResponse()).ToList();

            _logger.LogInformation("Return all users");
            
            return users;
        }

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
            
            _logger.LogInformation("Creating user, id = {id}, first name = {first}, second name = {second}, patronymic = {patronymic}, email = {email}, phone number = {number}",
                user.Guid, user.Name, user.Surname, user.Patronymic, user.Email, user.PhoneNumber);
            
            await _cache.AddUser(user);
            
            _logger.LogInformation("Created user with id {id}", user.Guid);
            
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

            var newUser = request.ToUser(user);
            
            _logger.LogInformation("Updating user, id = {id}, first name = {first}, second name = {second}, patronymic = {patronymic}, email = {email}, phone number = {number}",
                user.Guid, user.Name, user.Surname, user.Patronymic, user.Email, user.PhoneNumber);
            
            await _cache.AddOrUpdateUser(newUser);
            
            _logger.LogInformation("Updated user with id {id}", user.Guid);
            
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
            
            _logger.LogInformation("Removing user with id {id}", userId);
            
            await _cache.RemoveUser(userId);
            
            _logger.LogInformation("Removed user with id {id}", userId);
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
            
            _logger.LogInformation("Assigning users to group with id {id}", group.Guid);
            
            // ReSharper disable once PossibleNullReferenceException
            foreach (var userId in request.UserIds)
            {
                var user = _cache.GetExistingUser(userId);
            
                if (user.Groups.Any(x => x.GroupId == group.Id && x.UserId == user.Id))
                    Errors.UserAlreadyAssignedToGroupError(user).Throw(StatusCodes.Status403Forbidden);
                
                _logger.LogInformation("Assigning user with id {userId} to group with id {groupId}", user.Guid, group.Guid);
                
                group.Users.Add(new UserGroup
                {
                    UserId = user.Id
                });
            }

            try
            {
                await _cache.UpdateGroups();
                _logger.LogInformation("Assigned users to group with id {id}", group.Guid);
            }
            catch (Exception)
            {
                _logger.LogInformation("What the hell exception");
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
            
            _logger.LogInformation("Removing users from group with id {id}", group.Guid);

            // ReSharper disable once PossibleNullReferenceException
            foreach (var userId in request.UserIds)
            {
                var user = _cache.GetExistingUser(userId);
                
                if (user.Groups.All(x => !(x.GroupId == group.Id && x.UserId == user.Id)))
                    Errors.UserAlreadyRemovedFromGroupError(user).Throw(StatusCodes.Status403Forbidden);
                
                _logger.LogInformation("Removing user with id {userId} from group with id {groupId}", user.Guid, group.Guid);

                user.Groups.RemoveAll(x => x.GroupId == group.Id && x.UserId == user.Id); 
            }
            
            await _cache.UpdateUsers();
            
            _logger.LogInformation("Removed users from group with id {id}", group.Guid);
        }
    }
}