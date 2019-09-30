using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common
{
    [Serializable]
    [Table("accounts")]
    public class Account
    {
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("amount")]
        public float Amount { get; set; }
        [Column("dept")]
        public float Dept { get; set; }
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }


        public User User { get; set; }
    }
}