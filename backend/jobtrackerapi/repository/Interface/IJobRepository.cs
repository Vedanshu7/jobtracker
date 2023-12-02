using System;
using database.Models;

namespace repository.Interface
{
    // This interface defines the contract for interacting with job-related data in a repository.
    public interface IJobRepository
    {
        // Adds a job to the repository and returns the added job.
        public Job AddJob(Job job);

        // Retrieves a job by its unique identifier (ID).
        public Job GetJob(Guid id);

        // Retrieves a list of jobs associated with a specific user.
        public List<Job> GetUsersJob(Guid userId);

        // Updates a job based on its unique identifier and returns the updated job.
        public Job UpdateJob(Guid id);

        // Deletes a job based on its unique identifier and returns true if the operation was successful.
        public bool DeleteJob(Guid id);

        public List<Job> GetUserJobs(Guid userId);

        public Dictionary<string, string> GetStatuses(Guid userId);
    }
}
