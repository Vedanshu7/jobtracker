using Microsoft.AspNetCore.Mvc;
using service.Interface;
using service.Models;

namespace jobtrackerapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthService service;
        public AuthController(IAuthService _authService)
        {
            service = _authService;
        }

        [GoogleTokenValidation]
        [HttpPost]
        public User Index(SingleSignOn singleSignOn)
        {
            var result = service.auth(singleSignOn).Result;
            return result;
        }
    }
}
