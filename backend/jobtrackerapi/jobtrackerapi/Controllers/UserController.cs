using Microsoft.AspNetCore.Mvc;
using service;

namespace jobtrackerapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService service;
        public UserController(IUserService _userService)
        {
            service = _userService;
        }


        [GoogleTokenValidation]
        [HttpGet(Name ="jobs")]
        public List<service.Models.Job> GetUserJobs(Guid userId)
        {
            return service.GetUserJobs(userId).Result;
        }

    }

}
