using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Internal;

namespace Common
{
    [Serializable]
    [Table("groups")]
    public class Group
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("guid")]
        public Guid Guid { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("cost")]
        public int Cost { get; set; }

        public WeekSchedule WeekSchedule { get; set; }
        public List<UserGroup> Users { get; set; }
        public List<Attendance> Attendance { get; set; }
        public List<TrueSchedule> TrueSchedules { get; set; }
        public List<Statistics> Statistics { get; set; }
    }
}