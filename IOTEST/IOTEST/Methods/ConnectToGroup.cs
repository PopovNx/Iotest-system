using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IOTEST.IoContext;

namespace IOTEST
{
    public partial class Methods
    {
        public class ConnectToGroup : IMethod
        {

            public async Task<string> Invoke(HttpContext context, IoContext userContext, DataControl control)
            {
                if (!control.IsOk || !context.Request.Form.ContainsKey("Key")) return "error";
                if (!await userContext.Groups.AnyAsync(x => x.Key == context.Request.Form["Key"].ToString())) return "No";
                
                var Group = await userContext.Groups.FirstAsync(x => x.Key == context.Request.Form["Key"].ToString());
                if (Group.Admin == control.UserData.Gmail || Group.Users.Any(x => x == control.UserData.Gmail)) return "Contains";
                Group.Users.Add(control.UserData.Gmail);
                userContext.Groups.Update(Group);
                await userContext.SaveChangesAsync();
                return "OK";
            }
        }
    }
}