using System;
using database.Models;

namespace repository.Interface
{
	public interface IJobRepository
	{
        public Job AddJob(Job job);
        public Job GetJob(Guid id);
        public List<Job> GetUsersJob(Guid userId);
        public Job UpdateJob(Guid id);
        public bool DeleteJob(Guid id);

    }
}

