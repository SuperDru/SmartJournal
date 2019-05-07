using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UsersPaymentManager.Database.Entities
{
    [Serializable]
    [Table("users")]
    public class User
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("guid")]
        public Guid Guid { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("surname")]
        public string Surname { get; set; }
        [Column("patronymic")]
        public string Patronymic { get; set; }
        [Column("phone_number")]
        public string PhoneNumber { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("password")]
        public string Password { get; set; }


        public Account Account { get; set; }
        public List<UserGroup> Groups { get; set; }
        public List<UserRole> Roles { get; set; }
        public List<Attendance> Attendance { get; set; }
        public List<Payment> Payments { get; set; }
    }
}