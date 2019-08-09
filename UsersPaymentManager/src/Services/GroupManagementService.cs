using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using UsersPaymentManager.Database;
using UsersPaymentManager.Database.Entities;
using UsersPaymentManager.Models;

namespace UsersPaymentManager.Services
{
    public interface IGroupManagementService
    {
        Task<GroupResponse> CreateGroup(GroupModel request);
        Task UpdateGroup(Guid id, GroupModel request);
        Task<GroupModel> GetGroup(Guid id);
        Task DeleteGroup(Guid id);

        Task<ICollection<GroupResponse>> GetGroups();
    }

    public class GroupManagementService: IGroupManagementService
    {
        private readonly DatabaseContext _db;

        public GroupManagementService(DatabaseContext db)
        {
            _db = db;
        }

        public async Task<GroupResponse> CreateGroup(GroupModel request)
        {
            var group = new Group();
            group.Guid = Guid.NewGuid();

            ToGroup(request, group);

            await _db.AddGroup(group);
            
            return ToGroupResponse(group);
        }

        public async Task UpdateGroup(Guid id, GroupModel request)
        {
            var group = await _db.GetGroupAsync(id);

            _db.TrueSchedule.RemoveRange(group.RemoveNotFixed());
            
            ToGroup(request, group);

            _db.Groups.Update(group);
            await _db.SaveChangesAsync();
        }

        public async Task<GroupModel> GetGroup(Guid id) =>
            ToGroupResponse(await _db.GetGroupAsync(id));

        public async Task DeleteGroup(Guid id) =>
            await _db.DeleteGroup(id);

        public async Task<ICollection<GroupResponse>> GetGroups() =>
            (await _db.GetGroupsAsync()).Select(ToGroupResponse).ToList();

        
        private static GroupResponse ToGroupResponse(Group source)
        {
            return new GroupResponse
            {
                Name = source.Name,
                Cost = source.Cost,
                Guid = source.Guid,
                Days = source.WeekSchedule.Days,
                Duration = source.WeekSchedule.Duration,
                StartTimes = source.WeekSchedule.StartTimes
            };
        }

        private static void ToGroup(GroupModel source, Group target)
        {
            target.Name = source.Name;
            target.Cost = source.Cost;

            target.WeekSchedule = new WeekSchedule
            {
                Days = source.Days,
                Duration = source.Duration,
                StartTimes = source.StartTimes,
                GroupId = target.Id
            };
        }
    }
}