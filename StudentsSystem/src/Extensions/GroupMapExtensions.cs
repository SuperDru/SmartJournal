using System;
using Common;

namespace StudentsSystem
{
    public static class GroupMapExtensions
    {
        public static GroupResponse ToGroupResponse(this Group source) =>
            new GroupResponse
            {
                Cost = source.Cost,
                Guid = source.Guid,
                Name = source.Name,
                Days = source.WeekSchedule.Days,
                Duration = source.WeekSchedule.Duration,
                StartTimes = source.WeekSchedule.StartTimes
            };
        
        public static GroupModel ToGroupModel(this Group source) =>
            new GroupModel
            {
                Cost = source.Cost,
                Name = source.Name,
                Days = source.WeekSchedule.Days,
                Duration = source.WeekSchedule.Duration,
                StartTimes = source.WeekSchedule.StartTimes
            };

        public static Group ToGroup(this GroupModel source, Group target = null)
        {
            target = target ?? new Group();
            
            target.Guid = target.Guid == default ? Guid.NewGuid() : target.Guid;
            target.Cost = source.Cost;
            target.Name = source.Name;
            target.WeekSchedule = new WeekSchedule
            {
                Days = source.Days,
                Duration = source.Duration,
                StartTimes = source.StartTimes
            };

            return target;
        }
    }
}