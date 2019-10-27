using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Common;
using Microsoft.Extensions.Logging;
using Serilog;
using ILogger = Microsoft.Extensions.Logging.ILogger;

namespace StudentsSystem
{
    /// <inheritdoc />
    [Route("/groups")]
    public class GroupsController: Controller
    {
        private readonly ICacheRepository _cache;
        private readonly ILogger<GroupsController> _logger;

        /// <inheritdoc />
        public GroupsController(ICacheRepository cache, ILogger<GroupsController> logger)
        {
            _cache = cache;
            _logger = logger;
        }

        /// <summary>
        /// Returns list of groups
        /// </summary>
        [HttpGet]
        public ICollection<GroupResponse> GetGroups()
        {
            _logger.LogInformation("Return all groups");
            return _cache.GetGroups().Select(x => x.ToGroupResponse()).ToList();
        }

        /// <summary>
        /// Returns the group with {groupId}
        /// </summary>
        [HttpGet("{groupId:Guid}")]
        public GroupModel GetGroup([FromRoute] Guid groupId)
        {
            var group = _cache.GetExistingGroup(groupId).ToGroupModel();
            _logger.LogInformation("Return group with id {groupId}", groupId);
            return group;
        }

        /// <summary>
        /// Creates new group. 
        /// Returns group with guid
        /// </summary>
        [HttpPost]
        public async Task<GroupResponse> CreateGroup([FromBody] GroupModel request)
        {
            var group = request.ToGroup();

            if (_cache.GetGroups().Count(x => x.Name == group.Name) != 0)
                Errors.GroupWithThisNameExistsError.Throw(StatusCodes.Status403Forbidden);
            
            _logger.LogInformation("Creating group, id = {id}, name = {name}, cost = {cost}, duration = {duration}", 
                group.Guid, group.Name, group.Cost, group.WeekSchedule.Duration);
            
            group.TrueSchedules = new List<TrueSchedule>();
            group.TrueSchedules.BuildSchedule(group.WeekSchedule, logger: _logger);
            
            await _cache.AddGroup(group);
            
            _logger.LogInformation("Group with id {id} created", group.Guid);
            
            return _cache.GetGroup(group.Guid).ToGroupResponse();
        }

        /// <summary>
        /// Rewrites information about the group with {groupId}. 
        /// Returns group with updated information
        /// </summary>
        [HttpPut("{groupId:Guid}")]
        public async Task<GroupResponse> UpdateGroup([FromRoute] Guid groupId, [FromBody] GroupModel request)
        {
            var oldGroup = _cache.GetExistingGroup(groupId);
            
            if (oldGroup.Name != request.Name && _cache.GetGroups().Count(x => x.Name == request.Name) != 0)
                Errors.GroupWithThisNameExistsError.Throw(StatusCodes.Status403Forbidden);

            var group = request.ToGroup(oldGroup);
            
            _logger.LogInformation("Updating group, id = {id}, name = {name}, cost = {cost}, duration = {duration}", 
                group.Guid, group.Name, group.Cost, group.WeekSchedule.Duration);
            
            group.TrueSchedules.BuildSchedule(group.WeekSchedule, logger: _logger);

            await _cache.AddOrUpdateGroup(group);
            
            _logger.LogInformation("Updated group with id {id}", group.Guid);
            
            return _cache.GetGroup(group.Guid).ToGroupResponse();
        }

        /// <summary>
        /// Deletes the group with {groupId}
        /// </summary>
        [HttpDelete("{groupId:Guid}")]
        public async Task RemoveGroup([FromRoute] Guid groupId)
        {
            // Check that group exists
            _cache.GetExistingGroup(groupId);
            
            _logger.LogInformation("Removing group with id {id}", groupId);
            
            await _cache.RemoveGroup(groupId);
            
            _logger.LogInformation("Removed group with id {id}", groupId);
        }

        /// <summary>
        /// Returns users of the group with {groupId}
        /// </summary>
        [HttpGet("{groupId:Guid}/users")]
        public ICollection<UserResponse> GetUsers([FromRoute] Guid groupId)
        {
            var users = _cache.GetExistingGroup(groupId).Users.Select(x => x.User.ToUserResponse()).ToList();

            _logger.LogInformation("Return users of group with id {groupId}", groupId);
            
            return users;
        }
    }
}