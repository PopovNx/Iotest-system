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
            const string myPath = "/TestItems/Prefabs/UserImages/";
            const string publicPath = "/TestItems/Prefabs/Public/";
            var user = await db.Users.FirstOrDefaultAsync(x => x.Id == control.UserData.Id);
            var myRes = await db.Resources.Where(x => x.Owner==user).ToListAsync();
            
            var publicRes =await db.Resources.Where(x => x.Public).ToListAsync();
            
            
            var resX = new List<(bool, TestX.Resource)>();
            
            foreach (var f in myRes) 
                resX.Add((false, new TestX.Resource(f.Name, $"{myPath}{f.FileName}")));

            foreach (var f in publicRes) 
                resX.Add((true, new TestX.Resource(f.Name, $"{publicPath}{f.FileName}")));
            
            return JsonConvert.SerializeObject(resX);
        }
    }
}