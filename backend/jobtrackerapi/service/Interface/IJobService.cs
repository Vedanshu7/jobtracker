using System;
using service.Models;

namespace service.Interface
{
	public interface IJobService
	{
		public Task<Job> AddJob(Job job);
	}
}

