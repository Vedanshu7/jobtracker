using AutoMapper;
using repository.Interface;
using service.Interface;
using service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository authRepostiory;

        private readonly IMapper _mapper;


        public AuthService(IAuthRepository _repository, IMapper mapper)
        {
            this.authRepostiory = _repository;
            this._mapper = mapper;
        }

        public async Task<User> auth(SingleSignOn singleSignOn)
        {
            return _mapper.Map<service.Models.User> (authRepostiory.auth(_mapper.Map<database.Models.SingleSignOn>(singleSignOn)));
        }
    }
}
