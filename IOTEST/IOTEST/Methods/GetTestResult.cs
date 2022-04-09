using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

namespace IOTEST.Methods
{
  
    [UsedImplicitly]
        public class GetTestResult : IMethod
        {
            public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
            {
                if (!control.IsOk || !context.Request.Form.ContainsKey("Key")) return "error";
                var key = context.Request.Form["Key"].ToString();
                var test = await db.Tests.FirstOrDefaultAsync(x => x.Key == key);
                if (test is null) return "test key error";
                var results = await db.LevelResults.Where(x => x.Test == test)
                    .Include(x=>x.User)
                    .ToListAsync();
                
                if(context.Request.Form.TryGetValue("Group", out var gKey))
                {
                    var grp =await db.Groups.FirstOrDefaultAsync(x => x.Key == gKey.ToString());
                    if (grp !=null)
                    {
                        var users = grp.Users;
                        results = results.Where(x => users.Contains(x.User.Gmail)).ToList();
                    }
                }
                var res = new List<(IoContext.User User, string Mark, List<DateTime> Time)>(); 
                
                foreach (var g in results.GroupBy(x=>x.User))
                {
                    var usr = g.Key;
                    var mark = @"Не завершено";
                    if (g.Any(x => x.Finish))
                    {
                        var ans = GetMark.Calculate(g)*100;
                        mark  =  $"{ans:F1}%";
                    }
                    var time = g.Select(x=>x.Created).ToList();
                    res.Add((usr, mark, time));
                }
                
                return JsonConvert.SerializeObject(res);
            }
        
    } 
}