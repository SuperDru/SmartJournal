using System;

namespace UsersPaymentManager.Models
{
    public class UserDayInfoResponse
    {
        public DateTime Date { get; set; }
        public bool IsPaid { get; set; }
    }
}