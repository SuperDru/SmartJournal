using System;
using System.Collections.Generic;

namespace StudentsSystem
{
    public class AttendanceResponse
    {
        public ICollection<UserDayInfoResponse> Attendance { get; set; }
        public Guid UserId { get; set; }
    }
}