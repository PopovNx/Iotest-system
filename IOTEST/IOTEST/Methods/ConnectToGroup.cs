using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace IOTEST.Methods
{
   
    [UsedImplicitly]
        public class ConnectToGroup : IMethod
        {

            public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
            {
                if (!control.IsOk || !context.Request.Form.ContainsKey("Key")) return "error";
                var key = context.Request.Form["Key"].ToString();
                if (string.IsNullOrEmpty(key)) return "invalid";

                var group = await db.Groups.FirstOrDefaultAsync(x => x.Key == key);
                if (group is null) return "not found";
                if (group.Admin == control.UserData.Gmail) return "adm";
                if (group.Users.Any(x => x == control.UserData.Gmail)) return "contains";
                if (!group.Open)return "close";
                group.Users.Add(control.UserData.Gmail);
                db.Groups.Update(group);
                await db.SaveChangesAsync();
                return "OK";
            }
        }
    }
