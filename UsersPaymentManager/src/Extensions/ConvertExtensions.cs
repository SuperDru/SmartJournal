using Storage;
using UsersPaymentManager.Models;

namespace UsersPaymentManager
{
    public static class ConvertExtensions
    {
        public static UserResponse ToUserResponse(this User source)
        {
            return new UserResponse
            {
                Guid = source.Guid,
                Name = source.Name,
                Email = source.Email,
                Surname = source.Surname,
                Dept = source.Account.Dept,
                Amount = source.Account.Amount,
                Patronymic = source.Patronymic,
                PhoneNumber = source.PhoneNumber,
                UpdatedAt = source.Account.UpdatedAt,
            };
        }
        
        public static void ToUser(this UserModel source, User target)
        {
            target.Name = source.Name;
            target.Email = source.Email;
            target.Surname = source.Surname;
            target.Patronymic = source.Patronymic;
            target.PhoneNumber = source.PhoneNumber;
        }

        public static UserDayInfoResponse ToUserDayInfo(this Attendance source)
        {
            return new UserDayInfoResponse
            {
                Date = source.Date,
                IsPaid = source.PaymentAmount <= 0.00001
            };
        }
    }
}