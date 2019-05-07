using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UsersPaymentManager.Models;
using UsersPaymentManager.Services;

namespace UsersPaymentManager.Controllers
{
//    [Route("/")]
//    public class LoginController: Controller
//    {
//        private readonly ILoginService _loginService;
//
//        public LoginController(ILoginService loginService)
//        {
//            _loginService = loginService;
//        }
//
//        [HttpPost("login")]
//        public async Task Login([FromBody] UserLoginRequest request) =>
//            await HttpContext.SignInAsync(await _loginService.Login(request));
//        
//        [Authorize]
//        [HttpPost("logout")]
//        public async Task Logout() =>
//            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
//    }
}