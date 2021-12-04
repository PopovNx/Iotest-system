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
    public class RemoveTestX : IMethod
    {
        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk || !context.Request.Form.ContainsKey("TaskId") ||
                !context.Request.Form.ContainsKey("TestKey")) return "error";
            var taskKey = context.Request.Form["TestKey"].ToString();
            var taskId = int.Parse(context.Request.Form["TaskId"].ToString());

            var test = await db.Tests.FirstOrDefaultAsync(x => x.Key == taskKey);
            if (test is null) return "undef test";

            var fJ = JsonConvert.DeserializeObject<IoContext.Test.DnTestData>(test.JsonData);
            fJ.Levels.RemoveAll(x => x.Id == taskId);
            test.JsonData = JsonConvert.SerializeObject(fJ);
            await db.SaveChangesAsync();

            return JsonConvert.SerializeObject(1);
        }
    }
}