using database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace repository.Interface
{
    public interface IUserRepository
    {
        public List<User> GetUsers();
    }
}
