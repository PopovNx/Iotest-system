using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace IOTEST.Methods
{
    [UsedImplicitly]
    public class GetTest : IMethod
    {
        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk || !context.Request.Form.ContainsKey("TestKey") || !context.Request.Form.ContainsKey("TestId")) return "error";
            var key = context.Request.Form["TestKey"].ToString();
            var id = int.Parse(context.Request.Form["TestId"].ToString());
            var test =await db.Tests.FirstOrDefaultAsync(x => x.Key == key);
            if (test is null) return "undef test";
            var fJ = JsonConvert.DeserializeObject<IoContext.Test.DnTestData>(test.JsonData);


            if (fJ.Levels.All(x => x.Id != id))
            {
                fJ.Levels.Add(new Models.TestX(id));
                test.JsonData = JsonConvert.SerializeObject(fJ);
                await db.SaveChangesAsync();
            }
            var i = fJ.Levels.First(x=>x.Id == id);
            return JsonConvert.SerializeObject(i);
        }
    }
}