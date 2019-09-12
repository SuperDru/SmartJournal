using System;

namespace AttendanceAndPayments
{
    public class UserDayInfoRequest
    {
        public DateTime Date { get; set; }
        public bool IsAttended { get; set; }
    }
}