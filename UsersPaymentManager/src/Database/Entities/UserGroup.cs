using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace UsersPaymentManager.Database.Entities
{
    [Serializable]
    [Table("user_groups")]
    public class UserGroup
    {
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("group_id")]
        public int GroupId { get; set; }
        
        public User User { get; set; }
        public Group Group { get; set; }
    }
}