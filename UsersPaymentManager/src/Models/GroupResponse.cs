using System;
using UsersPaymentManager.Database.Entities;

namespace UsersPaymentManager.Models
{
    public class GroupResponse: GroupModel
    {
        public Guid Guid { get; set; }
    }
}