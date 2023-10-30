using database.Models;
using Microsoft.EntityFrameworkCore;

namespace database.context
{
    // This class represents a custom database context that inherits from DbContext in Entity Framework.
    public class DbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        // Constructor for the DbContext class, which accepts DbContextOptions as a parameter.
        public DbContext(DbContextOptions options) : base(options)
        {
            // Initialize the DbContext with the provided options.
        }

        // Represents a database DbSet for the 'User' entity.
        public DbSet<User> User { get; set; }

        // Represents a database DbSet for the 'Job' entity.
        public DbSet<Job> Job { get; set; }
    }
}
