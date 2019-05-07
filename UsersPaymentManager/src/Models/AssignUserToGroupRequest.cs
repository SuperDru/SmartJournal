using System;

namespace UsersPaymentManager.Models
{
    public class AssignUserToGroupRequest
    {
        public Guid UserId { get; set; }
        public Guid GroupId { get; set; }
    }
}