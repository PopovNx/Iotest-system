using System;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace IOTEST.Methods
{
    [UsedImplicitly]
    public class CreateTest : IMethod
    {
        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk || !context.Request.Form.ContainsKey("Data")) return "error";
            var Data = JsonConvert.DeserializeObject<IoContext.Test>(context.Request.Form["Data"]);
            var Test = new IoContext.Test
            {
                Author = control.UserData.Gmail,
                Key = CreateGroup.KeyGen(),
                Name = Data.Name,
                Description = Data.Description,
                JsonData = JsonConvert.SerializeObject(new IoContext.Test.DnTestData()),
                FinalText = Data.FinalText,
                Created = DateTime.Now
            };
            await db.Tests.AddAsync(Test);
            await db.SaveChangesAsync();
            return JsonConvert.SerializeObject(Test);
        }
    }
}