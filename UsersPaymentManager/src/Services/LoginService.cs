using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using UsersPaymentManager.Database;
using UsersPaymentManager.Models;

namespace UsersPaymentManager.Services
{
//    public interface ILoginService
//    {
//        Task<ClaimsPrincipal> Login(UserLoginRequest request);
//    }
//    
//    public class LoginService: ILoginService
//    {
//        private readonly IDbConnectionFactory _db;
//        private readonly IUserService _userService;
//
//        public LoginService(IDbConnectionFactory db, IUserService userService)
//        {
//            _db = db;
//            _userService = userService;
//        }
//
//        public async Task<ClaimsPrincipal> Login(UserLoginRequest request)
//        {
//            var user = await _userService.GetUser(request.Email);
//            var roles = await _userService.GetUserRoles(user.Id);
//            
//            var correct = PasswordGenerator.HashPassword(request.Password, user.Salt) == user.Password;
//
//            //checking
//            
//            var claims = new List<Claim>()
//            {
//                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Id.ToString()),
//                new Claim(ClaimTypes.Email, user.Email)
//            };
//            claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r.Name)));
//            
//            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme,
//                ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
//
//            return new ClaimsPrincipal(claimsIdentity);
//        }
//    }
}