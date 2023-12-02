using System;
using service.Models;

namespace service.Interface
{
    // This interface defines the contract for a service that manages job-related operations.
    public interface IJobService
    {
        // Adds a job using the provided job object and returns a Task representing the added job.
        // Note: This method is asynchronous, returning a Task<Job> to represent the added job.
        public Task<Job> AddJob(Job job);

        // Retrieves a job by its unique identifier (ID) and returns a Task<Job>.
        public Task<Job> GetJob(Guid id);

        // Deletes a job by its ID and returns a boolean indicating the success of the operation.
        // Note: This method is synchronous, returning a boolean indicating the success of the deletion.
        public bool DeleteJob(Guid id);

        public Task<Dictionary<string, string>> GetStatuses(Guid userId);

        public Task<Job> UpdateJob(Guid id, Job job);

        public List<string> GetLocations(Guid userId);
    }
}