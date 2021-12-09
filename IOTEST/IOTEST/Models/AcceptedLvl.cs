using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IOTEST
{
    public sealed partial class IoContext
    {
        [Serializable]
        [Table("LevelResults")]
        public class LevelResult
        {
            [Key]
            public int Id { get; set; }
            public Test Test { get; set; }
            public User User { get; set; }
            public bool Finish { get; set; }
            public int LevelIndex { get; set; }
            public string JsonData { get; set; }
            public DateTime Created { get; set; }
            public class ResultData
            {
                public List<List<int>> Correct { get; set; }
                public List<List<int>> Result { get; set; }
            }
        }
    }
}