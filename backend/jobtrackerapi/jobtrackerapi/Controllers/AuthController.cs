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
        public IActionResult Index(SingleSignOn singleSignOn)
        {
            if (service.auth(singleSignOn).Result)
            {
                return NoContent();
            }
            return BadRequest();
        }
    }
}
