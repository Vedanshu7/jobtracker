using AutoMapper;
using repository.Interface;
using service.Interface;
using service.Models;


namespace service.Services
{
    // This class represents a service for managing job-related operations.
    public class JobService : IJobService
    {
        private readonly IJobRepository jobRepository;
        private readonly IMapper _mapper;

        // Constructor for the JobService class, which injects IJobRepository and IMapper.
        public JobService(IJobRepository _repository, IMapper mapper)
        {
            this.jobRepository = _repository;
            this._mapper = mapper;
        }

        // Adds a job to the service by mapping it between service and repository layers and returns the added job.
        public async Task<Job> AddJob(Job job)
        {
            // Map the service layer Job object to a repository layer Job object, add it to the repository, and then map it back.
            return _mapper.Map<service.Models.Job>(jobRepository.AddJob(_mapper.Map<database.Models.Job>(job)));
        }
    }
}
