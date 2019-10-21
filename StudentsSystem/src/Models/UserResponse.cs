using System;

namespace StudentsSystem
{
    public class UserResponse: UserModel
    {
        public Guid Guid { get; set; }

        public float Amount { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}