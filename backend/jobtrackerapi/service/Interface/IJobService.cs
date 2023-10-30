using System;
using service.Models;

namespace service.Interface
{
    // This interface defines the contract for a service that manages job-related operations.
    public interface IJobService
    {
        // Adds a job using the provided job object and returns a Task representing the added job.
        public Task<Job> AddJob(Job job);
    }
}
