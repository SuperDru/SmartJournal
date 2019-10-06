using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common
{
    [Table("Statistics")]
    public class Statistics
    {
        [Column("group_id")]
        public int GroupId { get; set; }
        [Column("people_amount")]
        public int PeopleAmount { get; set; }
        [Column("attendance_percentage")]
        public int AttendancePercentage { get; set; }
        [Column("visits_amount")]
        public int VisitsAmount { get; set; }
        [Column("expected_income")]
        public float ExpectedIncome { get; set; }
        [Column("date")]
        public DateTime Date { get; set; }

        public Group Group { get; set; }
    }
}