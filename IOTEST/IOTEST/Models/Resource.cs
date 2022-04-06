using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IOTEST
{
    public sealed partial class IoContext
    {
        [Table("Resources")]
        [Serializable]
        public class Resource
        {
            [Key]
            public int Id { get; set; }
            public DateTime Created { get; set; }
            public User Owner{ get; set; }
            public string FileName { get; set; }
            public string Name { get; set; }
            public bool Public { get; set; }
        }
    }
}