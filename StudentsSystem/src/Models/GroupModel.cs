using System.ComponentModel.DataAnnotations;
using Common;

namespace StudentsSystem
{
    public class GroupModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [MinLength(7)]
        [MaxLength(7)]
        public bool[] Days { get; set; }
        [Required]
        [MinLength(7)]
        [MaxLength(7)]
        [StringArrayTimes]
        public string[] StartTimes { get; set; }

        [Required]
        [Range(0, 1000)]
        public int Duration { get; set; }
        [Required]
        [Range(0, 1000000)]
        public int Cost { get; set; }
    }
}