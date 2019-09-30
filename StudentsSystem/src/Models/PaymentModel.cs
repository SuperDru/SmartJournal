using System;
using System.ComponentModel.DataAnnotations;

namespace StudentsSystem
{
    public class PaymentModel
    {
        [Required]
        [Range(0, 100000000)]
        public float Amount { get; set; }
        public DateTime Payday { get; set; }
    }
}