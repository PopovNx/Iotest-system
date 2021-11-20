using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IOTEST
{
    public sealed partial class IoContext
    {
        [Serializable]
        [Table("Groups")]
        public class Group
        {
            [Key]
            public int Id { get; set; }
            public string Name { get; set; }
            public string Admin { get; set; }
            public DateTime Created { get; set; }
            public List<string> Users { get; set; }
            public List<string> Tests { get; set; }
            public string Key { get; set; }
            public bool Open { get; set; }
            public List<string> InvitedUsers { get; set; }

        }
    }
}