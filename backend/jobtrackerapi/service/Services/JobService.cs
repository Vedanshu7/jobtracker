using AutoMapper;
using repository.Interface;
using service.Interface;
using service.Models;


namespace service.Services
{
	public class JobService : IJobService
	{
        private readonly IJobRepository jobRepostiory;

        private readonly IMapper _mapper;


        public JobService(IJobRepository _repository, IMapper mapper)
        {
            this.jobRepostiory = _repository;
            this._mapper = mapper;
        }

        public async Task<Job> AddJob(Job job)
        {
            return _mapper.Map<service.Models.Job>(jobRepostiory.AddJob(_mapper.Map<database.Models.Job>(job)));
        }
    }
}