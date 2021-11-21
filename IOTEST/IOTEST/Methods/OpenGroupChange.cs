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
    public class OpenGroupChange : IMethod
    {
        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk || !context.Request.Form.ContainsKey("State") ||
                !context.Request.Form.ContainsKey("Key")) return "error";
            var key = context.Request.Form["Key"].ToString();
            var isOpen = context.Request.Form["State"].ToString().ToLower();
            if (isOpen is not ("true" or "false")) return "Is Open Error";

            if (!await db.Groups.AnyAsync(x => x.Key == key && x.Admin == control.UserData.Gmail))
                return "No";
            var k = await db.Groups.FirstAsync(x => x.Key == key);
            k.Open = isOpen is "true";
            await db.SaveChangesAsync();
            return "Yes";
        }
    }
}