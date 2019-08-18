using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Storage;

namespace StudentsSystem
{
    [Route("/schedule/{groupId}")]
    public class ScheduleController: Controller
    {
        private readonly IDatabaseCache _cache;

        public ScheduleController(IDatabaseCache cache)
        {
            _cache = cache;
        }

        [HttpGet]
        public ICollection<TrueScheduleModel> GetSchedule([FromRoute] Guid groupId, [FromQuery] DateTime from, [FromQuery] DateTime to)
        {
            if (to == default) to = DateTime.Today.AddMonths(1);
            
            if (to > DateTime.Today.AddMonths(1)) return null;

            var group = _cache.GetGroup(groupId);
            return group.TrueSchedules
                .Where(x => x.Date >= from && x.Date <= to && x.Lesson)
                .Select(x => x.ToTrueScheduleModel())
                .ToList();
        }

        [HttpPut]
        public async Task UpdateSchedule([FromRoute] Guid groupId, [FromBody] ICollection<TrueScheduleRequest> request)
        {
            var group = _cache.GetGroup(groupId);
            var trueSchedules = group.TrueSchedules;
            
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