using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UsersPaymentManager.Database;
using UsersPaymentManager.Database.Entities;
using UsersPaymentManager.Models;

namespace UsersPaymentManager.Services
{
    public interface IUserManagementService
    {
        Task<UserResponse> CreateUser(UserModel request);
        Task<UserResponse> GetUser(Guid userId);
        Task UpdateUser(Guid id, UserModel request);
        Task DeleteUser(Guid id);

        Task<ICollection<UserResponse>> GetUsers(Guid groupId);

        Task AssignUserToGroup(Guid userId, Guid groupId);
        Task RemoveUserFromGroup(Guid userId, Guid groupId);
    }

    public class UserManagementService: IUserManagementService
    {
        private readonly DatabaseContext _db;

        public UserManagementService(DatabaseContext db, IMapper mapper)
        {
            _db = db;
        }


        public async Task<UserResponse> CreateUser(UserModel request)
        {
            var user = new User()
            {
                Guid = Guid.NewGuid(),
                Account = new Account()
                {
                    Amount = 0,
                    Dept = 0,
                    UpdatedAt = DateTime.Now
                },
            };

            ToUser(request, user);

            await _db.AddUser(user);

            return await GetUser(user.Guid);
        }

        public async Task<UserResponse> GetUser(Guid userId) =>
            ToUserResponse(await _db.GetUserAsync(userId));

        public async Task UpdateUser(Guid id, UserModel request)
        {
            var user = await _db.GetUserAsync(id);

            ToUser(request, user);

            _db.Users.Update(user);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteUser(Guid id) =>
            await _db.DeleteUser(id);

        public async Task<ICollection<UserResponse>> GetUsers(Guid groupId) =>
            (await _db.GetGroupAsync(groupId)).Users.Select(x => ToUserResponse(x.User)).ToList();

        public async Task AssignUserToGroup(Guid userId, Guid groupId)
        {
            var group = await _db.GetGroupAsync(groupId);
            var user = await _db.GetUserAsync(userId);

            var userGroup = new UserGroup()
            {
                UserId = user.Id,
                GroupId = group.Id
            };

            _db.UserGroups.Add(userGroup);
            await _db.SaveChangesAsync();

            group.Users.Add(userGroup);
            user.Groups.Add(userGroup);

            userGroup.Group = group;
            userGroup.User = user;
        }

        public async Task RemoveUserFromGroup(Guid userId, Guid groupId)
        {
            var user = await _db.GetUserAsync(userId);
            var group = await _db.GetGroupAsync(groupId);

            var userGroup = group.Users.First(u => u.User.Guid == userId);

            group.Users.Remove(userGroup);
            user.Groups.Remove(userGroup);

            _db.UserGroups.Remove(userGroup);
            await _db.SaveChangesAsync();
        }

        private static UserResponse ToUserResponse(User source)
        {
            return new UserResponse()
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


        private static void ToUser(UserModel source, User target)
        {
            target.Name = source.Name;
            target.Email = source.Email;
            target.Surname = source.Surname;
            target.Patronymic = source.Patronymic;
            target.PhoneNumber = source.PhoneNumber;
        }
    }
}