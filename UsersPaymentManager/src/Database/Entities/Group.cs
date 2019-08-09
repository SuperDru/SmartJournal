using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Internal;

namespace UsersPaymentManager.Database.Entities
{
    [Serializable]
    [Table("groups")]
    public class Group
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("guid")]
        public Guid Guid { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("cost")]
        public int Cost { get; set; }

        public WeekSchedule WeekSchedule { get; set; }
        public List<UserGroup> Users { get; set; }
        public List<Attendance> Attendance { get; set; }
        public List<TrueSchedule> TrueSchedules { get; set; }
        
        public Dictionary<DayOfWeek, string> GetWeekSchedule()
        {
            var weekSchedule = new Dictionary<DayOfWeek, string>();

            for (var i = 0; i < 7; i++)
                if (WeekSchedule.Days[i])
                    weekSchedule[(DayOfWeek)((i + 1) % 7) ] = WeekSchedule.StartTimes[i];
            
            return weekSchedule;
        }

        public TrueSchedule AddTrueSchedule(DateTime date, string startTime, int discount = 0, bool @fixed = false)
        {
            var schedule = new TrueSchedule
            {
                Date = date,
                Discount = discount,
                StartTime = startTime,
                GroupId = Id,
                Fixed = @fixed,
                Lesson = true
            };

            TrueSchedules = TrueSchedules ?? new List<TrueSchedule>();
            TrueSchedules.Add(schedule);

            return schedule;
        }
        
        public IEnumerable<TrueSchedule> RemoveNotFixed()
        {
            var schedule = TrueSchedules.Where(x => !x.Fixed).ToList();
            
            TrueSchedules.RemoveAll(x => !x.Fixed);

            return schedule;
        }
        
        public IEnumerable<TrueSchedule> BuildSchedule(DateTime endTime = default)
        {
            var weekSchedule = GetWeekSchedule();

            var last = DateTime.Today.AddMonths(1) < endTime ? endTime : DateTime.Today.AddMonths(1);

            var schedule = new List<TrueSchedule>();
            
            for (var cur = DateTime.Today; cur <= last; cur = cur.AddDays(1))
                if (weekSchedule.ContainsKey(cur.DayOfWeek) && TrueSchedules.All(x => x.Date != cur))
                    schedule.Add(AddTrueSchedule(cur, weekSchedule[cur.DayOfWeek]));

            return schedule;
        }

        public bool IsDayOfWeekSchedule(DateTime date) =>
            WeekSchedule.IsDayOfWeek(date.DayOfWeek);
    }
}