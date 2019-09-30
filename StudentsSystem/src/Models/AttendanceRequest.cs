using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StudentsSystem
{
    public class AttendanceRequest
    {
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public ICollection<UserDayInfoRequest> UpdatedAttendance { get; set; }
    }
}