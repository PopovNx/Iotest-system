using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IOTEST.Database
{
    public class UserContext : DbContext
    {
        public enum UserProfType
        {
            Unset,
            User,
            Teacher,
            Scholar
        }
        [Table("Users")]
        public class User
        {
            public string FirstName { get; set; }
            public string FamilyName { get; set; }
            public string Image { get; set; }
            public string Gmail { get; set; }
            public string Token { get; set; }
            public UserProfType UserProf { get; set; }

        }

        public DbSet<User> Users { get; set; }
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
            Database.EnsureCreated();

        }
    }
}
