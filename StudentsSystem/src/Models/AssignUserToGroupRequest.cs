using System;

namespace StudentsSystem
{
    public class AssignUserToGroupRequest
    {
        public Guid UserId { get; set; }
        public Guid GroupId { get; set; }
    }
}