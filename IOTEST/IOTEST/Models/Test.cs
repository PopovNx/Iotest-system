using System.Collections.Generic;
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
            public string Name { get; set; }
            public string Opis { get; set; }
            public List<string> EndText { get; set; }
            public string OcenType { get; set; }
            public bool DispNowBal { get; set; }
            public int MaxBal { get; set; }
            public List<Map> Maps { get; set; }
            public class Map
            {
                public string Name { get; set; }
                public string Cond { get; set; }
                public int MaxBal { get; set; }
                public smap Smap { get; set; }
                public class smap
                {
                    public List<dynamic> Objects { get; set; }
                    public List<dynamic> Triggers { get; set; }
                    public List<dynamic> Interactive { get; set; }
                    public string MapType { get; set; }
                    public Testsettings TestSettings { get; set; }
                    public string Bg { get; set; }
                    public class Testsettings
                    {
                        public string PassRule { get; set; }
                        public int Bal { get; set; }
                    }
                }
            }
        }
    }
}
