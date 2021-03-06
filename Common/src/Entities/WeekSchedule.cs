using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common
{
    [Serializable]
    [Table("week_schedule")]
    public class WeekSchedule
    {
        [Column("group_id")]
        public int GroupId { get; set; }
        [Column("days")]
        public bool[] Days { get; set; }
        [Column("start_times")]
        public string[] StartTimes { get; set; }
        [Column("duration")]
        public int Duration { get; set; }

        public Group Group { get; set; }


        public bool IsDayOfWeek(DateTime day)
        {
            return Days[((int) day.DayOfWeek + 6) % 7];
        }

        public string GetStartTime(DateTime day)
        {
            return StartTimes.Length >= 7 ? StartTimes[((int) day.DayOfWeek + 6) % 7] : null;
        }
    }
}