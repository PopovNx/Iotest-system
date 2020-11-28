using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Security.Policy;
using System.Threading.Tasks;
using static IOTEST.IoContext;

namespace IOTEST
{
    public partial class Methods
    {
        public class CreateTest : IMethod
        {
            public async Task<string> Invoke(HttpContext context, IoContext DataBase, DataControl control)
            {
                if (!control.IsOk || !context.Request.Form.ContainsKey("Data")) return "error";
                var Data = (Uri.UnescapeDataString( context.Request.Form["Data"].ToString()));
                var Test = new Test();
                Test.Email = control.UserData.Gmail;
                Test.KEY = KeyGen();
                Test.JsonData = Data;
                Test.Created = DateTime.Now;
                await DataBase.Tests.AddAsync(Test);
                await DataBase.SaveChangesAsync();
                Console.WriteLine(Data);                
                return "Ok";
            }
        }
    }
}