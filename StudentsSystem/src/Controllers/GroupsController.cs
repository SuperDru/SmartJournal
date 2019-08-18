using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Storage;

namespace StudentsSystem
{
    [Route("/groups")]
    public class GroupsController: Controller
    {
        private readonly IDatabaseCache _cache;
        
        public GroupsController(IDatabaseCache cache)
        {
            _cache = cache;
        }

        [HttpGet]
        public ICollection<GroupResponse> GetGroups() =>
            _cache.GetGroups().Select(x => x.ToGroupResponse()).ToList();

        [HttpGet("{groupId}")]
        public GroupModel GetGroup([FromRoute] Guid groupId) =>
            _cache.GetGroup(groupId).ToGroupModel();

        [HttpPost]
        public async Task<GroupResponse> CreateGroup([FromBody] GroupModel request)
        {
            var group = request.ToGroup();
            
            group.TrueSchedules = new List<TrueSchedule>();
            group.TrueSchedules.BuildSchedule(group.WeekSchedule);
            
            await _cache.AddGroup(group);
            return _cache.GetGroup(group.Guid).ToGroupResponse();
        }

        [HttpPut("{groupId}")]
        public async Task UpdateGroup([FromRoute] Guid groupId, [FromBody] GroupModel request)
        {
            var group = request.ToGroup(_cache.GetGroup(groupId));
            group.TrueSchedules.BuildSchedule(group.WeekSchedule);

            await _cache.AddOrUpdateGroup(group);
        }

        [HttpDelete("{groupId}")]
        public async Task RemoveGroup([FromRoute] Guid groupId) =>
            await _cache.RemoveGroup(groupId);

        [HttpGet("{groupId}/users")]
        public ICollection<UserResponse> GetUsers([FromRoute] Guid groupId) => 
            _cache.GetGroup(groupId).Users.Select(x => x.User.ToUserResponse()).ToList();
    }
}