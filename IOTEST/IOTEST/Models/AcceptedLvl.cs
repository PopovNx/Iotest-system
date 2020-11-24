using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IOTEST
{
    public partial class IoContext
    {
        [Table("AcceptedLvls")]
        public class AcceptedLvl
        {
            [Key]
            public int Id { get; set; }
            public string KEY { get; set; }
            public string Email { get; set; }
            public bool IsLast { get; set; }
            public int Num { get; set; }
            public ResultData Result { get; set; }
            public class ResultData
            {
                [Key]
                public int Id { get; set; }
                public int Max { get; set; }
                public int Result { get; set; }
                public int Settings { get; set; }
                public string Rule { get; set; }
            }
        }
    }
}
