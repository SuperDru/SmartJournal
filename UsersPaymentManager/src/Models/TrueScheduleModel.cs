using System;

namespace UsersPaymentManager.Models
{
    public class TrueScheduleModel
    {
        public DateTime Date { get; set; }
        public string StartTime { get; set; } // if StartTime == null or empty, then it's deleted
        public int Discount { get; set; }
    }
}