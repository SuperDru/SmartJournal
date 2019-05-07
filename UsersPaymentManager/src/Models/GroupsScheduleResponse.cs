using System.Collections.Generic;

namespace UsersPaymentManager.Models
{
    public class GroupsScheduleResponse
    {
        public string Name { get; set; }
        public List<int> Days { get; set; }
    }
}