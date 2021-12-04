using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using IOTEST.Models;

namespace IOTEST
{
    public sealed partial class IoContext
    {
        [Serializable]
        [Table("Tests")]
        public class Test
        {
            [Key]
            public int Id { get; set; }
            public DateTime Created { get; set; }
            public string Key { get; set; }
            public string Author { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string FinalText { get; set; }
            public string JsonData { get; set; }
            public bool Disabled { get; set; }

            [Serializable]
            public class DnTestData
            {
                public List<TestX> Levels { get; set; }

                public DnTestData()
                {
                    Levels = new List<TestX>();
                }
            }
        }
    }
}