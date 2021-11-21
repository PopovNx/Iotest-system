using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using JetBrains.Annotations;

namespace IOTEST
{
    [Serializable]
    public sealed partial class IoContext : DbContext
    {
       
        public DbSet<User> Users { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<AcceptedLvl> AcceptedLvls { get; set; }
        public DbSet<Group> Groups { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var valueComparer = new ValueComparer<List<string>>(
                (c1, c2) => c1.SequenceEqual(c2),
                c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                c => c.ToList());
            
            modelBuilder.Entity<Group>().Property(x => x.Tests)
                .HasConversion(v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());
            modelBuilder.Entity<Group>()
                .Property(x => x.Users)
                .HasConversion(v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());
          
            modelBuilder
                .Entity<Group>()
                .Property(e => e.Users)
                .Metadata
                .SetValueComparer(valueComparer);
            modelBuilder
                .Entity<Group>()
                .Property(e => e.Tests)
                .Metadata
                .SetValueComparer(valueComparer);
        }

        public IoContext(DbContextOptions<IoContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}