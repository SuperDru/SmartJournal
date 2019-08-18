using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Storage
{
    [Serializable]
    [Table("payments")]
    public class Payment
    {
        [Column("guid")]
        public Guid Guid { get; set; }
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("amount")]
        public float Amount { get; set; }
        [Column("paid_at")]
        public DateTime PaidAt { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        public User User { get; set; }
    }
}