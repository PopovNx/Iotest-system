using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IOTEST.IoContext;

namespace IOTEST
{
    public partial class Methods
    {
        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public static string KeyGen() => (RandomString(3) + "-" + RandomString(3) + "-" + RandomString(3));      
        public class CreateGroup : IMethod
        {
            
            public async Task<string> Invoke(HttpContext context, IoContext userContext, DataControl control)
            {
                if (!control.IsOk || !context.Request.Form.ContainsKey("Name")) return "error";
                var Res = new Group
                {
                    Created = DateTime.Now,
                    Admin = control.UserData.Gmail,
                    Name = context.Request.Form["Name"],
                    Tests = new List<string>(),
                    Users = new List<string>(),
                    Key = KeyGen()

                };
                await userContext.Groups.AddAsync(Res);
                await userContext.SaveChangesAsync();
                return "OK";
            }
        }
    }
}