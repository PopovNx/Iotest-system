using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace IOTEST.Methods
{
    [UsedImplicitly]
    public class CreateTask : IMethod
    {
        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk || !context.Request.Form.ContainsKey("TestKey") || !context.Request.Form.ContainsKey("Name")) return "error";
            var key = context.Request.Form["TestKey"].ToString();
            var name =context.Request.Form["Name"].ToString();
            
            var test =await db.Tests.FirstOrDefaultAsync(x => x.Key == key);
            if (test is null) return "undef test";
            
            var fJ = JsonConvert.DeserializeObject<IoContext.Test.DnTestData>(test.JsonData);
            if (fJ != null)
            {
                var t = new Models.TestX(fJ.Levels.Count)
                {
                    Name = name,
                };
                fJ.Levels.Add(t);
                test.JsonData = JsonConvert.SerializeObject(fJ);
                await db.SaveChangesAsync();
                return "Ok";
            }
            return "null";
        }
    }
}