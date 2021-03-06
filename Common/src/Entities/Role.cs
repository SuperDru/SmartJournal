using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common
{
    [Serializable]
    [Table("roles")]
    public class Role
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }

        public ICollection<UserRole> Users { get; set; }
    }
}