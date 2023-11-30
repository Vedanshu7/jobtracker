using database.Models;
using repository.Interface;


namespace repository.Repositories
{
    // This class represents a repository for managing job-related data.
    public class JobRepository : IJobRepository
    {
        private readonly database.context.DbContext dbContext;

        // Constructor for the JobRepository class, which injects a DbContext.
        public JobRepository(database.context.DbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // Adds a job to the database and returns the added job.
        public Job AddJob(Job job)
        {
            // Add the provided job to the DbContext and save changes to the database.
            dbContext.Add(job);
            dbContext.SaveChanges();
            return job;
        }

        // Deletes a job based on its unique identifier and returns true if the operation was successful.
        public bool DeleteJob(Guid id)
        {
            try
            {
                // Search job to delete by ID
                var jobToDelete = dbContext.Set<Job>().FirstOrDefault(j => j.Id == id);

                if (jobToDelete != null)
                {
                    dbContext.Set<Job>().Remove(jobToDelete);
                    dbContext.SaveChanges();
                    return true; // Deletion successful
                }

                return false; // Job with the given ID not found
            }
            catch (Exception ex)
            {
                // Handle exception, log, or throw it based on your application's requirements
                return false; // Deletion unsuccessful
            }
        }

        // Retrieves a job by its unique identifier (ID).
        public Job GetJob(Guid id)
        {
            // Use the Find method to retrieve a job by its ID.
            Job? job = dbContext.Set<Job>().Find(id);

            // Check if the job is null and handle accordingly.
            if (job == null)
            {
                //throw new KeyNotFoundException($"Job with ID {id} not found.");
                return null;
            }

            return job;
        }

        public List<Job> GetUserJobs(Guid userId)
        {
            var jobs = dbContext.Job.Where(u=>u.userId == userId).ToList();

            return jobs;
        }

        // Retrieves a list of jobs associated with a specific user.
        public List<Job> GetUsersJob(Guid userId)
        {
            throw new NotImplementedException();
        }

        // Updates a job based on its unique identifier and returns the updated job.
        public Job UpdateJob(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
