using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace UsersPaymentManager.Database.Entities
{
    [Serializable]
    [Table("payments")]
    public class Payment
    {
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("amount")]
        public float Amount { get; set; }
        [Column("paid_at")]
        public DateTime Payday { get; set; }

        public User User { get; set; }
    }
}