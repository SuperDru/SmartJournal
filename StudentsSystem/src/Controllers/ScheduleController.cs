using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Storage;

namespace StudentsSystem
{
    /// <inheritdoc />
    [Route("/schedule/{groupId:Guid}")]
    public class ScheduleController: Controller
    {
        private readonly IDatabaseCache _cache;

        /// <inheritdoc />
        public ScheduleController(IDatabaseCache cache)
        {
            _cache = cache;
        }

        /// <summary>
        /// Returns schedule with all changes of group with {groupId} from {from} to {to} date
        /// </summary>
        [HttpGet]
        public ICollection<TrueScheduleModel> GetSchedule([FromRoute] Guid groupId, [FromQuery, Required] DateTime from, [FromQuery] DateTime to)
        {
            if (to == default) to = DateTime.Today.AddMonths(1);
            
            if (to > DateTime.Today.AddMonths(4)) return null;

            var group = _cache.GetExistingGroup(groupId);
            return group.TrueSchedules
                .Where(x => x.Date >= from && x.Date <= to && x.Lesson)
                .Select(x => x.ToTrueScheduleModel())
                .ToList();
        }

        /// <summary>
        /// Adds, updates or deletes days of schedule of group with {groupId}
        /// </summary>
        [HttpPut]
        public async Task UpdateSchedule([FromRoute] Guid groupId, [FromBody] ICollection<TrueScheduleRequest> request)
        {
            var group = _cache.GetGroup(groupId);
            var trueSchedules = group.TrueSchedules;
            
//            if (request.Any(x => x.Date < DateTime.Today) || request.Any(x => x.Date == DateTime.Today) && group.Attendance.Any(x => x.Date == DateTime.Today))
//                Errors.AttemptToChangeFixedScheduleError.Throw(StatusCodes.Status403Forbidden);
            
            foreach (var day in request)
            {
                var oldDay = trueSchedules.FirstOrDefault(x => x.Date == day.Date);

                var isDayOfWeekSchedule = group.WeekSchedule.IsDayOfWeek(day.Date);
                
                if (oldDay == null)
                {
                    trueSchedules.Add(day.ToTrueSchedule());
                }
                else if (day.ToDelete)
                {
                    if (!isDayOfWeekSchedule) trueSchedules.Remove(oldDay);
                    
                    oldDay.Fixed = true;
                    oldDay.Lesson = false;
                }
                else
                {
                    oldDay.Discount = day.Discount;
                    oldDay.StartTime = day.StartTime;
                    oldDay.Fixed = !isDayOfWeekSchedule;
                    oldDay.Lesson = true;
                }
            }

            await _cache.AddOrUpdateGroup(group);
        }
    }
}