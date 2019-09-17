using System;
using Storage;

namespace StudentsSystem
{
    public static class UserMapExtensions
    {
        public static UserResponse ToUserResponse(this User source) =>
            new UserResponse
            {
                Guid = source.Guid,
                Name = source.Name,
                Email = source.Email,
                Surname = source.Surname,
                Patronymic = source.Patronymic,
                PhoneNumber = source.PhoneNumber,
                UpdatedAt = source.Account.UpdatedAt,
                Amount = source.Account.Amount,
                Dept = source.Account.Dept,
            };

        public static User ToUser(this UserModel source, User target = null)
        {
            target = target ?? new User
            {
                Guid = Guid.NewGuid(),
                Account = new Account
                {
                    Amount = 0,
                    Dept = 0,
                    UpdatedAt = DateTime.Now
                }
            };
            target.Name = source.Name;
            target.Email = source.Email;
            target.Surname = source.Surname;
            target.Patronymic = source.Patronymic;
            target.PhoneNumber = source.PhoneNumber;

            return target;
        }
    }
}