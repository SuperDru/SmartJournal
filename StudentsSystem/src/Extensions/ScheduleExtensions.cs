using System;
using System.Collections.Generic;
using System.Linq;
using Common;
using Microsoft.Extensions.Logging;

namespace StudentsSystem
{
    public static class ScheduleExtensions
    {
        public static void BuildSchedule(this ICollection<TrueSchedule> schedule, WeekSchedule newSchedule, DateTime to = default, ILogger logger = null)
        {
            to = to < DateTime.Today.AddMonths(4) ? DateTime.Today.AddMonths(4) : to;

            for (var cur = DateTime.Today; cur <= to; cur = cur.AddDays(1))
            {
                var old = schedule.FirstOrDefault(x => x.Date == cur);
                
                if (old != null && old.Fixed) continue;
                
                schedule.Remove(old);
                
                if (old != null)
                    logger?.LogInformation("Removed old day from schedule, date = {date}", old.Date);

                if (!newSchedule.IsDayOfWeek(cur)) continue;
                
                schedule.Add(new TrueSchedule
                {
                    Date = cur,
                    Discount = 0,
                    Fixed = false,
                    StartTime = newSchedule.GetStartTime(cur),
                    Lesson = true
                });
                logger.LogInformation("Added new day to schedule, date = {date}", cur);
            }
        }
    }
}