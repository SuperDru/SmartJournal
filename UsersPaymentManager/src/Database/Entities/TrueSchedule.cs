using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace UsersPaymentManager.Database.Entities
{
    [Serializable]
    [Table("true_schedule")]
    public class TrueSchedule
    {
        [Column("group_id")]
        public int GroupId { get; set; }
        [Column("date")]
        public DateTime Date { get; set; }
        [Column("is_lesson")]
        public bool IsLesson { get; set; }
        [Column("discount")]
        public int Discount { get; set; }
        [Column("start_time")]
        public string StartTime { get; set; }
        [Column("is_fixed")]
        public bool IsFixed { get; set; }

        public Group Group { get; set; }
    }
}