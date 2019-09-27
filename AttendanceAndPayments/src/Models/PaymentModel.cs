using System;
using System.ComponentModel.DataAnnotations;

namespace AttendanceAndPayments
{
    public class PaymentModel
    {
        [Required]
        [Range(0, 100000000)]
        public float Amount { get; set; }
        public DateTime Payday { get; set; }
    }
}