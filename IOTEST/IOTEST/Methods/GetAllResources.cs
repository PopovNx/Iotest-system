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
            await Task.Yield();
            if (!control.IsOk) return "error";
            var data = (from f in Directory.GetFiles("wwwroot/TestItems/", "*.*", SearchOption.AllDirectories)
                select f.Split("/").Last()
                into s
                select s.Split("\\")
                into ss
                let url = $"TestItems/{string.Join("/", ss)}"
                let name = $"{string.Join(".", ss.Skip(1).SkipLast(1))}" + $".{ss.Last().Split(".").First()}"
                select new TestX.Resource(name, url)).ToList();

            return JsonConvert.SerializeObject(data);
        }
    }
}