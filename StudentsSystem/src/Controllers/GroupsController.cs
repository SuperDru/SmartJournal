using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Storage;

namespace StudentsSystem
{
    /// <inheritdoc />
    [Route("/groups")]
    public class GroupsController: Controller
    {
        private readonly IDatabaseCache _cache;

        /// <inheritdoc />
        public GroupsController(IDatabaseCache cache)
        {
            _cache = cache;
        }

        /// <summary>
        /// Returns list of groups
        /// </summary>
        [HttpGet]
        public ICollection<GroupResponse> GetGroups() =>
            _cache.GetGroups().Select(x => x.ToGroupResponse()).ToList();

        /// <summary>
        /// Returns the group with {groupId}
        /// </summary>
        [HttpGet("{groupId}")]
        public GroupModel GetGroup([FromRoute] Guid groupId) =>
            _cache.GetExistingGroup(groupId).ToGroupModel();

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
            
            group.TrueSchedules = new List<TrueSchedule>();
            group.TrueSchedules.BuildSchedule(group.WeekSchedule);
            
            await _cache.AddGroup(group);
            return _cache.GetGroup(group.Guid).ToGroupResponse();
        }

        /// <summary>
        /// Rewrites information about the group with {groupId}. 
        /// Returns group with updated information
        /// </summary>
        [HttpPut("{groupId}")]
        public async Task<GroupResponse> UpdateGroup([FromRoute] Guid groupId, [FromBody] GroupModel request)
        {
            var oldGroup = _cache.GetExistingGroup(groupId);
            
            if (oldGroup.Name != request.Name && _cache.GetGroups().Count(x => x.Name == request.Name) != 0)
                Errors.GroupWithThisNameExistsError.Throw(StatusCodes.Status403Forbidden);
            
            var group = request.ToGroup(oldGroup);
            group.TrueSchedules.BuildSchedule(group.WeekSchedule);

            await _cache.AddOrUpdateGroup(group);
            return _cache.GetGroup(group.Guid).ToGroupResponse();
        }

        /// <summary>
        /// Deletes the group with {groupId}
        /// </summary>
        [HttpDelete("{groupId}")]
        public async Task RemoveGroup([FromRoute] Guid groupId)
        {
            // Check that group is existed
            _cache.GetExistingGroup(groupId);
            
            await _cache.RemoveGroup(groupId);
        }

        /// <summary>
        /// Returns users of the group with {groupId}
        /// </summary>
        [HttpGet("{groupId}/users")]
        public ICollection<UserResponse> GetUsers([FromRoute] Guid groupId) => 
            _cache.GetExistingGroup(groupId).Users.Select(x => x.User.ToUserResponse()).ToList();
    }
}