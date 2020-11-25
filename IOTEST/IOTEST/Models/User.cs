using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IOTEST
{
    public partial class IoContext
    {
        [Table("Users")]
        public class User
        {
            [Key]
            public int Id { get; set; }

            public string FirstName { get; set; }
            public string FamilyName { get; set; }
            public string Gmail { get; set; }
            public string Image { get; set; }
            public string Token { get; set; }
            public UserProfType UserProf { get; set; }
        }
    }
}