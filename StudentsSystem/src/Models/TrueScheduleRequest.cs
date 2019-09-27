using System.ComponentModel.DataAnnotations;

namespace StudentsSystem
{
    public class TrueScheduleRequest : TrueScheduleModel
    {
        [Required]
        public bool ToDelete { get; set; }
    }
}