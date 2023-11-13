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

        // This HTTP DELETE action method is used to delete a job by its ID.
        [HttpDelete("{id}")]
        public IActionResult DeleteJob(Guid id)
        {
            try
            {
                // Call the DeleteJob method from the injected service to delete the job.
                bool deletionResult = service.DeleteJob(id);

                // Check if the deletion was successful.
                if (deletionResult)
                {
                    // Return a 200 OK response with a success message if deletion is successful.
                    return Ok($"Job with ID {id} has been successfully deleted.");
                }
                else
                {
                    // Return a 404 Not Found response if the job with the specified ID is not found.
                    return NotFound($"Job with ID {id} not found.");
                }
            }
            catch (Exception ex)
            {
                // Return a 500 Internal Server Error response in case of an exception.
                return StatusCode(500, "Internal server error");
            }
        }

        // This HTTP GET action method is used to retrieve a job by its ID.
        [HttpGet("{id}")]
        public IActionResult GetJob(Guid id)
        {
            try
            {
                var job = service.GetJob(id);

                if (job != null)
                {
                    return Ok(job); // Return a 200 OK response with the job if found.
                }
                else
                {
                    return NotFound($"Job with ID {id} not found."); // Return a 404 Not Found if the job is not found.
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception based on your application's requirements
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
