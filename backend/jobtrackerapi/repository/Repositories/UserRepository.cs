using database.context;
using database.Models;
using repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace repository.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DbContext dbContext;

        public UserRepository(DbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<User> GetUsers()
        {
            return dbContext.User.ToList();
        }

    }
}
