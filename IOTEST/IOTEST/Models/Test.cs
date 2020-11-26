using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IOTEST
{
    public partial class IoContext
    {
        [Table("Tests")]
        public class Test
        {
            [Key]
            public int Id { get; set; }
            public DateTime Created { get; set; }
            public string KEY { get; set; }
            public string Email { get; set; }
            public string JsonData { get; set; }
        }
    }
}