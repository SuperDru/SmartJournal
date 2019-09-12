using System;
using System.Collections.Generic;

namespace AttendanceAndPayments
{
    public class AttendanceRequest
    {
        public Guid UserId { get; set; }
        public ICollection<UserDayInfoRequest> UpdatedAttendance { get; set; }
    }
}