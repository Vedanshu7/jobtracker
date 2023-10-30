using Microsoft.AspNetCore.Mvc;
using service.Interface;
using service.Models;

namespace jobtrackerapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobController : Controller
	{
        private readonly IJobService service;
        public JobController(IJobService _jobService)
        {
            service = _jobService;

        }

        [HttpPost]
        public Job AddJob(Job job) {
            return service.AddJob(job).Result;
        }

    }
}