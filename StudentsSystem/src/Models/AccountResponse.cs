using System;

namespace StudentsSystem
{
    public class AccountResponse
    {
        public Guid UserId { get; set; }
        public float Amount { get; set; }
        public float Dept { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}