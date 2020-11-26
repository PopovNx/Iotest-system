using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IOTEST
{
    public partial class IoContext
    {
        [Table("Groups")]
        public class Group
        {
            [Key]
            public int Id { get; set; }

            public string Name { get; set; }
            public string Admin { get; set; }
            public DateTime Created { get; set; }
            public List<GroupUser> Users { get; set; }
            public List<GroupTest> Tests { get; set; }
            public class GroupUser
            {
                [Key]
                public int Id { get; set; }
                public string Mail { get; set; }
            }
            public class GroupTest
            {
                [Key]
                public int Id { get; set; }
                public string Key { get; set; }
            }
        }
    }
}