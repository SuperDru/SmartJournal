using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Common;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StudentsSystem
{
    [Route("/sign-in")]
    public class SignInController: Controller
    {
        private const string Password = "Qweqwe_1";
        
        [HttpPost]
        public async Task SignIn([FromBody] SignInRequest request)
        {
            if (request.Password != Password)
                Errors.PasswordIncorrectError.Throw(StatusCodes.Status403Forbidden);
                
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, "Admin")
            };
            
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme,
                ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

            await HttpContext.SignInAsync(new ClaimsPrincipal(claimsIdentity));
        }
    }
}