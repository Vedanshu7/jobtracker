using database.context;
using database.Models;
using repository.Interface;

namespace repository.Repositories
{
	public class JobRepository : IJobRepository
	{
        private readonly DbContext dbContext;

        public JobRepository(DbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Job AddJob(Job job)
        {

            var b = dbContext.Job.Add(job);
            dbContext.SaveChanges();
            return job;
        }

        public bool DeleteJob(Guid id)
        {
            throw new NotImplementedException();
        }

        public Job GetJob(Guid id)
        {
            throw new NotImplementedException();
        }

        public List<Job> GetUsersJob(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Job UpdateJob(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}