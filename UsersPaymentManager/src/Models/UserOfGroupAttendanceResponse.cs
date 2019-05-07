using System;
using System.Collections.Generic;

namespace UsersPaymentManager.Models
{   
    public class UserOfGroupAttendanceResponse
    {
        public int Id { get; set; }
        public ICollection<UserDayInfoResponse> UserDays { get; set; }
        public UserProfile UserProfile { get; set; }
        public float AccountAmount { get; set; }
        public float Dept { get; set; }
    }
}