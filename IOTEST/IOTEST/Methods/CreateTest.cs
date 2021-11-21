using System;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;

namespace IOTEST.Methods
{
    [UsedImplicitly]
    public class CreateTest : IMethod
    {
        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk || !context.Request.Form.ContainsKey("Data")) return "error";
            var Data = (Uri.UnescapeDataString(context.Request.Form["Data"].ToString()));
            var Test = new IoContext.Test
            {
                Email = control.UserData.Gmail,
                KEY = CreateGroup.KeyGen(),
                JsonData = Data,
                Created = DateTime.Now
            };
            await db.Tests.AddAsync(Test);
            await db.SaveChangesAsync();
            Console.WriteLine(Data);
            return "Ok";
        }
    }
}