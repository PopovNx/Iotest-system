using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace IOTEST.Methods
{
    [UsedImplicitly]
    public class CreateGroup : IMethod
    {
        private static readonly Random Random = new();

        private static string RandomString(int length)
        {
            const string chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[Random.Next(s.Length)]).ToArray());
        }

        internal static string KeyGen() => (RandomString(3) + "-" + RandomString(3) + "-" + RandomString(3));

        public async Task<string> Invoke(HttpContext context, IoContext userContext, DataControl control)
        {
            if (!control.IsOk || !context.Request.Form.ContainsKey("Name")) return "error";
            var groupName = context.Request.Form["Name"].ToString();
            if (groupName.Length < 3) return "error";
            if (await userContext.Groups.AnyAsync(x => x.Name == groupName)) return "exist";
            var Res = new IoContext.Group
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