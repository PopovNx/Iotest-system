using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace IOTEST.Methods
{
    [UsedImplicitly]
    public class AboutGroup : IMethod
    {
        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk || !context.Request.Form.ContainsKey("Key")) return "error";
            var Key = context.Request.Form["Key"].ToString();
            var Group = await db.Groups.FirstOrDefaultAsync(x => x.Key == Key);
            return JsonConvert.SerializeObject(Group);
        }
    }
}