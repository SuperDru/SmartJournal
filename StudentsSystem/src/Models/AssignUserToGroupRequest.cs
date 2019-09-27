using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StudentsSystem
{
    public class AssignUserToGroupRequest
    {
        public ICollection<Guid> UserIds { get; set; }
        public Guid? UserId { get; set; }
        [Required]
        public Guid GroupId { get; set; }
    }
}