using AutoMapper;
using repository.Interface;
using repository.Repositories;
using service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepostiory;

        private readonly IJobRepository jobRepository;

        private readonly IMapper _mapper;


        public UserService(IUserRepository _repository, IMapper mapper, IJobRepository jobRepository)
        {
            this.userRepostiory = _repository;
            this._mapper = mapper;
            this.jobRepository = jobRepository;
        }

        public async Task<List<User>> GetAll()
        {
            var user =  userRepostiory.GetUsers();

            return _mapper.Map<List<User>>(user);
        }
        
        public async Task<List<Job>> GetUserJobs(Guid userId){
            var jobs = jobRepository.GetUserJobs(userId);

            return _mapper.Map<List<Job>>(jobs);
        }

    }
}
