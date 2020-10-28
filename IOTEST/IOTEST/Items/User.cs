using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOTEST.Items
{
    public enum UserProfType
    {
        Unset,
        User,
        Teacher,
        Scholar
    }
    public class User
    {
        public string FirstName { get; set; }
        public string FamilyName { get; set; }
        public string Image { get; set; }
        public string Gmail { get; set; }
        public string Token { get; set; }
        public UserProfType UserProf { get; set; }

    }
}
