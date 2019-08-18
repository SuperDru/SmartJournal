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
        
        public static User ToUser(this UserModel source) =>
            new User
            {
                Guid = Guid.NewGuid(),
                Name = source.Name,
                Email = source.Email,
                Surname = source.Surname,
                Patronymic = source.Patronymic,
                PhoneNumber = source.PhoneNumber,
                Account = new Account
                {
                    Amount = 0,
                    Dept = 0,
                    UpdatedAt = DateTime.Now
                }
            };
    }
}