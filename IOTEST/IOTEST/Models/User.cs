using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IOTEST
{
    public sealed partial class IoContext
    {
        [Table("Users")]
        [Serializable]
        public class User
        {
            [Key]
            public int Id { get; set; }
            public DateTime Created { get; set; }
            public string FirstName { get; set; }
            public string FamilyName { get; set; }
            public string Gmail { get; set; }
            public string Image { get; set; }
            public string Token { get; set; }
            public UserProfType UserProf { get; set; }
            public enum UserProfType
            {
                User,
                Teacher
            }
        }
    }
}