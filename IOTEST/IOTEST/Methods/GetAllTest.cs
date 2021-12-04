using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace IOTEST.Methods
{
    [UsedImplicitly]
    public class GetAllTest : IMethod
    {
        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            await Task.Yield();
            if (!control.IsOk) return "error";
            
            var tests = await db.Tests.Where(x => x.Author == control.UserData.Gmail).ToListAsync();
            return JsonConvert.SerializeObject(tests);
        }
    }
}