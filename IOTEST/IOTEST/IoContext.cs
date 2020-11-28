using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace IOTEST
{
    public partial class IoContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<AcceptedLvl> AcceptedLvls { get; set; }
        public DbSet<Group> Groups { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Group>()
             .Property(x => x.Tests)
             .HasConversion(v => string.Join(',', v), v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());
            modelBuilder.Entity<Group>()
             .Property(x => x.Users)
             .HasConversion(v => string.Join(',', v), v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());
        }

        public IoContext(DbContextOptions<IoContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}