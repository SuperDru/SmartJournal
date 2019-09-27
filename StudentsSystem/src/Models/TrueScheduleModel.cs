using System;
using System.ComponentModel.DataAnnotations;
using Storage;

namespace StudentsSystem
{
    public class TrueScheduleModel
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]
        [Time]
        public string StartTime { get; set; }
        [Required]
        [Range(0,100)]
        public int Discount { get; set; }
    }
}