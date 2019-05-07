namespace UsersPaymentManager.Models
{
    public class GroupModel
    {
        public string Name { get; set; }

        public bool[] Days { get; set; }
        public string[] StartTimes { get; set; }

        public int Duration { get; set; }
        public int Cost { get; set; }
    }
}