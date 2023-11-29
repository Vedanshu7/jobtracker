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
    public class AuthRepository : IAuthRepository
    {
        private readonly DbContext dbContext;

        // Constructor for the JobRepository class, which injects a DbContext.
        public AuthRepository(DbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public bool auth(SingleSignOn singleSignOn)
        {
            User user = dbContext.User.Where(u => u.Email.Equals(singleSignOn.Email)).FirstOrDefault();
            if (user == null)
            {
                User newUser = new User();
                newUser.Email = singleSignOn.Email;
                string? displayName = singleSignOn?.ProviderData?.FirstOrDefault()?.DisplayName;
                newUser.FirstName = displayName?.Split(' ').Length > 0 
                    ? displayName?.Split(' ')[0] : "";
                newUser.LastName = displayName?.Split(' ').Length > 0 
                    ? displayName?.Split(' ')[0] : "";

                dbContext.Add(newUser);
                dbContext.SaveChanges();
            }

            User savedUser = dbContext.User.Where(u => u.Email.Equals(singleSignOn.Email)).FirstOrDefault();
            if(savedUser != null)
            {
                singleSignOn.UserId = savedUser.Id ;
                dbContext.Add(singleSignOn);
                dbContext.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
