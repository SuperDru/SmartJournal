using System;
using System.Collections.Generic;

namespace UsersPaymentManager.Models
{   
    public class UserOfGroupAttendanceRequest
    {
        public int UserId { get; set; }
        public ICollection<UserDayInfoRequest> ChangedUserDays { get; set; }
    }
}