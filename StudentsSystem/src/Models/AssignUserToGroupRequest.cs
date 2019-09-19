using System;
using System.Collections.Generic;

namespace StudentsSystem
{
    public class AssignUserToGroupRequest
    {
        public ICollection<Guid> UserIds { get; set; }
        public Guid GroupId { get; set; }
    }
}