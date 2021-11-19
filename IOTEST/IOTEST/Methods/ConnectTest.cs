using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace IOTEST.Methods
{

    [UsedImplicitly]
        public class ConnectTest : IMethod
        {

            public async Task<string> Invoke(HttpContext context, IoContext userContext, DataControl control)
            {
                if (!control.IsOk || !context.Request.Form.ContainsKey("GKey") || !context.Request.Form.ContainsKey("TKey")) return "error";
                if (!await userContext.Groups.AnyAsync(x => x.Key == context.Request.Form["GKey"].ToString())) return "No";
                var Group = await userContext.Groups.FirstAsync(x => x.Key == context.Request.Form["GKey"].ToString());
                if (Group.Tests.Contains(context.Request.Form["TKey"].ToString())) return "Contains";
                if (!await userContext.Tests.AnyAsync(x => x.KEY == context.Request.Form["TKey"].ToString())) return "NoTest";
                Group.Tests.Add(context.Request.Form["TKey"].ToString());
                userContext.Groups.Update(Group);
                await userContext.SaveChangesAsync();
                return "OK";
            }
        }
    
}