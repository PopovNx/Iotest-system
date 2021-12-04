using System;
using System.Linq;
using System.Threading.Tasks;
using IOTEST.Models;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace IOTEST.Methods
{
    [UsedImplicitly]
    public class SaveTest : IMethod
    {
        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk || !context.Request.Form.ContainsKey("Data") || !context.Request.Form.ContainsKey("Key")) return "error";
            var key = context.Request.Form["Key"].ToString();
            var test =await db.Tests.FirstOrDefaultAsync(x => x.Key == key);
            if (test is null) return "undef test";
            var data = context.Request.Form["Data"].ToString();
            var fJ = JsonConvert.DeserializeObject<IoContext.Test.DnTestData>(test.JsonData);
            var sTest = JsonConvert.DeserializeObject<TestX>(data);
            
            Console.WriteLine(test.JsonData);
            Console.WriteLine(sTest.Id);
            if (fJ.Levels.Any(x => x.Id == sTest.Id))
            {
                var i = fJ.Levels.FindIndex(x => x.Id == sTest.Id);
                fJ.Levels[i] = sTest;
            }

            test.JsonData = JsonConvert.SerializeObject(fJ);
            await db.SaveChangesAsync();
            
            return JsonConvert.SerializeObject(1);
        }
    }
}