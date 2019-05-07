namespace UsersPaymentManager.Models
{
    public class UserCreationRequest
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public long PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}