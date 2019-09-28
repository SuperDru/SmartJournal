using System;
using Storage;

namespace StudentsSystem
{
    public static class UserMapExtensions
    {
        public static UserResponse ToUserResponse(this User source)
        {
            var acc = source.Account;
            var amount = acc.Amount > 0 ? acc.Amount : 0;
            var dept = acc.Dept - acc.Amount;
            
            return new UserResponse
            {
                Guid = source.Guid,
                Name = source.Name,
                Email = source.Email,
                Surname = source.Surname,
                Patronymic = source.Patronymic,
                PhoneNumber = source.PhoneNumber,
                UpdatedAt = source.Account.UpdatedAt,
                Amount = amount,
                Dept = dept,
            };
        }

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