using System;
using System.Collections.Generic;
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
    public class GetAllResources : IMethod
    {
        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk) return "error";
            const string path = "/TestItems/Prefabs/UserImages/";
            var me = await db.Users.FirstOrDefaultAsync(x => x.Id == control.UserData.Id);
            var publicRes =await db.Resources.Where(x => x.Public).ToListAsync();
            var myRes = await db.Resources.Where(x => x.Owner==me).ToListAsync();
            var resX = new List<(bool, TestX.Resource)>();
            foreach (var f in myRes.Union(publicRes))
            {
                var dt = ( f.Public, new TestX.Resource(f.Name, $"{path}{f.FileName}"));
                resX.Add(dt);
            }
            
            return JsonConvert.SerializeObject(resX);
        }
    }
}