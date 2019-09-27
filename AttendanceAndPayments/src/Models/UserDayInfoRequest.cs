using System;
using System.ComponentModel.DataAnnotations;

namespace AttendanceAndPayments
{
    public class UserDayInfoRequest
    {
        public DateTime Date { get; set; }
        [Required]
        public bool IsAttended { get; set; }
    }
}