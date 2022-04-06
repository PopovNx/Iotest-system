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
    public class AddResource : IMethod
    {
        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk || !context.Request.Form.ContainsKey("Name")||context.Request.Form.Files.Count!=1) return "error";
            var file = context.Request.Form.Files.First();
            const string path = "wwwroot/TestItems/Prefabs/UserImages";
            var nName = $"UF.{control.UserData.Id}.{Guid.NewGuid()}.png";
            await using var fs = new FileStream($@"{path}/{nName}", FileMode.Create);
            await file.CopyToAsync(fs);
            fs.Close();
            var rs = new IoContext.Resource
            {
                Created = DateTime.Now,
                Name = context.Request.Form["Name"].ToString(),
                Owner = await db.Users.FirstOrDefaultAsync(x => x.Id == control.UserData.Id),
                FileName = nName,
                Public = false
            };
            await db.Resources.AddAsync(rs);
            await db.SaveChangesAsync();
            return nName;
        }
    }
}