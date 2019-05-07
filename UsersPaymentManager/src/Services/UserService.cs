using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UsersPaymentManager.Database;
using UsersPaymentManager.Database.Entities;
using UsersPaymentManager.Models;

namespace UsersPaymentManager.Services
{
    public interface IUserService
    {
        Task<UserProfile> GetUserProfile(int id);
        Task<UserProfile> GetUserProfile(string email);
        Task ChangeUserProfile(int id, UserProfile profile);
        Task<User> GetUser(int id);
        Task<User> GetUser(string email);
        Task<List<Role>> GetUserRoles(int id);
        Task CreateUser(UserCreationRequest request);


        Task<List<Attendance>> GetUserAttendance(int userId, int groupId, DateTime startDate, DateTime endDate);

    }

//    public class UserService: IUserService
//    {
//        private readonly IDbConnectionFactory _db;
//        private readonly IMapper _mapper;
//
//        public UserService(IDbConnectionFactory db, IMapper mapper)
//        {
//            _db = db;
//            _mapper = mapper;
//        }
//
//        public async Task<UserProfile> GetUserProfile(int id) =>
//            _mapper.Map<UserProfile>(await GetUser(id));
//
//        public async Task<UserProfile> GetUserProfile(string email) =>
//            _mapper.Map<UserProfile>(await GetUser(email));
//
//        public async Task ChangeUserProfile(int id, UserProfile profile)
//        {
//            var user = await GetUser(profile.Email);
//
//            //checking: user == null || user.Id == id
//
//            const string sql = "update users set name= @Name,surname= @Surname,patronymic= @Patronymic,email= @Email,phone_number= @PhoneNumber where id=@Id";
//            using (var con = _db.CreateConnection())
//            {
//                await con.ExecuteAsync(sql,
//                    new {profile.Name, profile.Surname, profile.Patronymic, profile.Email, profile.PhoneNumber, id});
//            }
//        }
//
//        public async Task<User> GetUser(int id)
//        {
//            using (var con = _db.CreateConnection())
//            {
//                var user = await con.QueryFirstOrDefaultAsync<User>("select * from users where id=@Id", new {Id = id});
//                return user;
//            }
//        }
//
//        public async Task<User> GetUser(string email)
//        {
//            using (var con = _db.CreateConnection())
//            {
//                var user = await con.QueryFirstOrDefaultAsync<User>("select * from users where email=@Email", new {Email = email});
//                return user;
//            }
//        }
//
//        public async Task<List<Role>> GetUserRoles(int id)
//        {
//            using (var con = _db.CreateConnection())
//            {
//                const string sql = "select * from user_roles A INNER JOIN roles B on A.role_id = B.id where user_id=@Id";
//                var roles = await con.QueryAsync<Role>(sql, new {Id = id});
//                return roles.ToList();
//            }
//        }
//
//        public async Task CreateUser(UserCreationRequest request)
//        {
//            var user = await GetUser(request.Email);
//
//            //checking: user == null && password is correct
//
//            var salt = request.Password == null ? null : PasswordGenerator.GenerateSalt();
//            var password = request.Password == null ? null : PasswordGenerator.HashPassword(request.Password, salt);
//
//            const string sql = "insert into users (name,surname,patronymic,email,phone_number,salt,password) values (@Name,@Surname,@Patronymic,@Email,@PhoneNumber,@Salt,@Password)";
//            using (var con = _db.CreateConnection())
//            {
//                await con.ExecuteAsync(sql,
//                    new {request.Name, request.Surname, request.Patronymic, request.Email, request.PhoneNumber, salt, password});
//            }
//        }
//
//
//        public async Task<List<Attendance>> GetUserAttendance(int userId, int groupId, DateTime startDate, DateTime endDate)
//        {
//            using (var con = _db.CreateConnection())
//            {
//                const string sql = "select * from attendance where group_id=@GroupId and user_id=@Id and date>=@StartDate and date<=@EndDate";
//                var listAttendance = await con.QueryAsync<Attendance>(sql, new {GroupId = groupId, Id = userId, StartDate = startDate, EndDate = endDate});
//
//                var days = listAttendance
//                    .OrderBy(d => d.Date)
//                    .ToList();
//
//                return days;
//            }
//        }
//    }
}