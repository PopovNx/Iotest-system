using System;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace IOTEST.Methods
{
    [UsedImplicitly]
    public class CreateTest : IMethod
    {
        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk || !context.Request.Form.ContainsKey("Data")) return "error";
            var data = JsonConvert.DeserializeObject<IoContext.Test>(context.Request.Form["Data"]);
            IoContext.Test test;
            
            if (await db.Tests.AnyAsync(x => x.Key == data.Key))
            {
                test =await db.Tests.FirstAsync(x => x.Key == data.Key);
                test.Name = data.Name;
                test.Description = data.Description;
                test.FinalText = data.FinalText;
                test.Disabled = data.Disabled;
            }
            else
            {  test = new IoContext.Test
                {
                    Author = control.UserData.Gmail,
                    Key = CreateGroup.KeyGen(),
                    Name = data.Name,
                    Description = data.Description,
                    JsonData = JsonConvert.SerializeObject(new IoContext.Test.DnTestData()),
                    FinalText = data.FinalText,
                    Created = DateTime.Now,
                    Disabled = false
                };
                await db.Tests.AddAsync(test);
                
            }
            await db.SaveChangesAsync();
            return JsonConvert.SerializeObject(test);
        }
    }
}