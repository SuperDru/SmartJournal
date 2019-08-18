using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Storage
{
    [Serializable]
    [Table("attendance")]
    public class Attendance
    {
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("group_id")]
        public int GroupId { get; set; }
        [Column("date")]
        public DateTime Date { get; set; }
        [Column("payment_amount")]
        public float PaymentAmount { get; set; }

        public User User { get; set; }
        public Group Group { get; set; }
    }
}