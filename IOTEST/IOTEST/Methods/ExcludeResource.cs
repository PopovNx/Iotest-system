using System;
using System.IO;
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
    public class ExcludeResource : IMethod
    {
        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk || !context.Request.Form.ContainsKey("Resource")) return "error";
            var res = JsonConvert.DeserializeObject<TestX.Resource>(context.Request.Form["Resource"]);

            var c =await db.Resources.Where(x => x.FileName == new FileInfo(res.Url).Name)
                .Where(x => x.Name == res.Name).FirstOrDefaultAsync();
            if (c != null)
            {
                db.Resources.Remove(c!);
                await db.SaveChangesAsync();
                return "Ok";
            }
           
          
            return "Err";
        }
    }
}