using Microsoft.EntityFrameworkCore;

namespace IOTEST
{
    public partial class IoContext : DbContext
    {
        public enum UserProfType
        {
            Unset,
            User,
            Teacher,
            Scholar
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<AcceptedLvl> AcceptedLvls { get; set; }

        public IoContext(DbContextOptions<IoContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}