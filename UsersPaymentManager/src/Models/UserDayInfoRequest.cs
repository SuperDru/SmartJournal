using System;

namespace UsersPaymentManager.Models
{
    public class UserDayInfoRequest
    {
        public DateTime Date { get; set; }
        public bool IsAttended { get; set; }
    }
}