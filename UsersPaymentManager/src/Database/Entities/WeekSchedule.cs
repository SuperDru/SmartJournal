using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace UsersPaymentManager.Database.Entities
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


        public bool IsDayOfWeek(DayOfWeek dayOfWeek)
        {
            return Days[((int) dayOfWeek + 6) % 7];
        }
    }
}