using System;
using System.Collections.Generic;

namespace UsersPaymentManager.Models
{
    public class AttendanceResponse
    {
        public ICollection<UserDayInfoResponse> Attendance { get; set; }
        public UserResponse User { get; set; }
    }
}