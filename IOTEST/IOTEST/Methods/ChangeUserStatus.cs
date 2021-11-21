using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace IOTEST.Methods
{
  
        [UsedImplicitly]
        public class ChangeUserStatus : IMethod
        {
            public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
            {
                if (!control.IsOk) return "error";
                var gmail = control.UserData.Gmail;
                var u = await db.Users.FirstOrDefaultAsync(x => x.Gmail == gmail);
                u.UserProf = u.UserProf == IoContext.User.UserProfType.Teacher
                    ? IoContext.User.UserProfType.User
                    : IoContext.User.UserProfType.Teacher;
               await db.SaveChangesAsync();
                return string.Empty;
            }
        
    }
}