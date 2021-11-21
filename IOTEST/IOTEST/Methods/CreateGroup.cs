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

        internal static string KeyGen(bool group = false) =>
            $"{RandomString(3)}-{RandomString(3)}-{RandomString(3)}{(@group ? ("-" + RandomString(3)) : "")}";

        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk || !context.Request.Form.ContainsKey("Name") ||
                !context.Request.Form.ContainsKey("IsOpen")) return "error";
            var groupName = context.Request.Form["Name"].ToString();
            var isOpen = context.Request.Form["IsOpen"].ToString().ToLower();

            if (isOpen is not ("true" or "false")) return "Is Open Error";
            if (groupName.Length < 3) return "Name Error";

            if (await db.Groups.AnyAsync(x => x.Name == groupName && x.Admin == control.UserData.Gmail))
                return "exist";
            var Res = new IoContext.Group
            {
                Created = DateTime.Now,
                Admin = control.UserData.Gmail,
                Name = context.Request.Form["Name"],
                Tests = new List<string>(),
                Users = new List<string>(),
                Open = isOpen == "true",
                Key = KeyGen(true)
            };
            await db.Groups.AddAsync(Res);
            await db.SaveChangesAsync();
            return Res.Key;
        }
    }
}