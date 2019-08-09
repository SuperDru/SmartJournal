using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace UsersPaymentManager.Database.Entities
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
        [Column("dept")]
        public bool Dept { get; set; }
        [Column("after_payment")]
        public Guid AfterPayment { get; set; }

        public User User { get; set; }
        public Group Group { get; set; }
    }
}