using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Storage
{
    [Serializable]
    [Table("true_schedule")]
    public class TrueSchedule
    {
        [Column("group_id")]
        public int GroupId { get; set; }
        [Column("date")]
        public DateTime Date { get; set; }
        [Column("discount")]
        public int Discount { get; set; }
        [Column("start_time")]
        public string StartTime { get; set; }
        [Column("lesson")]
        public bool Lesson { get; set; }
        [Column("fixed")]
        public bool Fixed { get; set; }
        
        public Group Group { get; set; }
    }
}