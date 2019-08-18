using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Storage
{
    [Serializable]
    [Table("payments")]
    public class Payment
    {
        [Column("id")]
        public Guid Id { get; set; }
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("amount")]
        public float Amount { get; set; }
        [Column("paid_at")]
        public DateTime Payday { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        public User User { get; set; }
    }
}