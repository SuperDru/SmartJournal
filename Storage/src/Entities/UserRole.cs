using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Storage
{
    [Serializable]
    [Table("user_roles")]
    public class UserRole
    {
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("role_id")]
        public int RoleId { get; set; }
        
        
        public User User { get; set; }
        public Role Role { get; set; }
    }
}