using service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service
{
    public interface IUserService
    {
        public Task<List<User>> GetAll();

        public Task<List<Job>> GetUserJobs(Guid userId);
    }
}
