using jobtrackerapi.Models;
using Microsoft.EntityFrameworkCore;

namespace jobtrackerapi.Data
{
    public class JobTrackerAPIDbContext : DbContext
    {
        public JobTrackerAPIDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<User> User { get; set; }
    }
}
