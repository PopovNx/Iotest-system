using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace IOTEST.Methods
{

    [UsedImplicitly]
        public class ConnectTest : IMethod
        {

            public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
            {
                if (!control.IsOk || !context.Request.Form.ContainsKey("GroupKey") || !context.Request.Form.ContainsKey("TestKey")|| !context.Request.Form.ContainsKey("Remove")) return "error";
                var groupKey = context.Request.Form["GroupKey"].ToString();
                var testKey = context.Request.Form["TestKey"].ToString();
                
                
                if (!await db.Groups.AnyAsync(x => x.Key == groupKey)) return "No";
                
                var group = await db.Groups.FirstAsync(x => x.Key == groupKey);
               
                if (!await db.Tests.AnyAsync(x => x.Key == testKey)) return "NoTest";
                if (context.Request.Form["Remove"] == "true")
                {
                    group.Tests.RemoveAll(x => x == testKey);
                }
                else
                {
                    if (group.Tests.Contains(testKey)) return "Contains";
                    group.Tests.Add(testKey);
                 
                }
                db.Groups.Update(group);
               
                await db.SaveChangesAsync();
                return "OK";
            }
        }
    
}