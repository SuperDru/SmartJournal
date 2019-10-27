using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Common;
using Microsoft.Extensions.Logging;

namespace StudentsSystem
{
    /// <inheritdoc />
    [Route("/schedule/{groupId:Guid}")]
    public class ScheduleController: Controller
    {
        private readonly ICacheRepository _cache;
        private readonly ILogger<ScheduleController> _logger;

        /// <inheritdoc />
        public ScheduleController(ICacheRepository cache, ILogger<ScheduleController> logger)
        {
            _cache = cache;
            _logger = logger;
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
            
            _logger.LogInformation("Return schedule of group with id {id} from {from} to {to} date", groupId, from, to);

            return group.TrueSchedules
                .Where(x => x.Date >= from && x.Date <= to && x.Lesson)
                .OrderBy(x => x.Date)
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
            
            _logger.LogInformation("Updating schedule of group with id {id}", groupId);

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
                
                if (oldDay != null)
                    _logger.LogInformation("{Updated} day: date = {date}, start = {start}, discount = {discount}", 
                        oldDay.Lesson ? "Updated" : "Deleted", oldDay.Date, oldDay.StartTime, oldDay.Discount);
                else
                    _logger.LogInformation("Added day: date = {date}, start = {start}, discount = {discount}", 
                        day.Date, day.StartTime, day.Discount);
            }

            await _cache.AddOrUpdateGroup(group);
            
            _logger.LogInformation("Updated schedule of group with id {id}", groupId);
        }
    }
}