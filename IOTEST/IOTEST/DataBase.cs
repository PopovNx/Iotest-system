using static IOTEST.Database.UserContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOTEST
{
    public static class DataBase
    {
        static List<User> TempDataBase = new List<User>
        {
        
        };

        static public List<User> Users
        {
            get
            {
                return new List<User>(TempDataBase);
            }
        }
        static public async Task Register(User user)
        {      
            TempDataBase.Add(user);
            await Task.Delay(1);
        }

    }
}
