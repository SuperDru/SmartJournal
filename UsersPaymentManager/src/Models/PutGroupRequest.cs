using System;

namespace UsersPaymentManager.Models
{
    public class PutGroupRequest: GroupModel
    {
        public Guid Guid { get; set; }
    }
}