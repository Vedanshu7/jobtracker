using Microsoft.AspNetCore.Mvc;
using service.Interface;
using service.Models;

namespace jobtrackerapi.Controllers
{
    // This class represents a controller for managing job-related operations in a web API.
    [ApiController]
    [Route("[controller]")]
    public class JobController : Controller
    {
        private readonly IJobService service;

        // Constructor for the JobController class, which injects an instance of IJobService.
        public JobController(IJobService _jobService)
        {
            service = _jobService;
        }

        // This HTTP POST action method is used to add a job to the system.
        [HttpPost]
        public Job AddJob(Job job)
        {
            // Call the AddJob method from the injected service to add the job and return the result.
            // Note that .Result is used to block and get the result from the asynchronous operation.
            return service.AddJob(job).Result;
        }
    }
}
