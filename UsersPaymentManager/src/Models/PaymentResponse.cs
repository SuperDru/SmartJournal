using System;

namespace UsersPaymentManager.Models
{
    public class PaymentResponse
    {
        public float Amount { get; set; }
        public DateTime Payday { get; set; }
    }
}