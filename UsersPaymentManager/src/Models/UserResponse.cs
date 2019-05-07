using System;

namespace UsersPaymentManager.Models
{
    public class UserResponse: UserModel
    {
        public Guid Guid { get; set; }

        public float Amount { get; set; }
        public float Dept { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}