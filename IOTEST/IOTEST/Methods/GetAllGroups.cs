using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace IOTEST.Methods
{
  
        [UsedImplicitly]
        public class GetAllGroups : IMethod
        {
            public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
            {
                if (!control.IsOk) return "error";
                var gmail = control.UserData.Gmail;
                var result = await db.Groups.Select(x=>x).AsNoTracking().ToArrayAsync();
                
                var data = result.Where(x => x.Admin == gmail || x.Users.Contains(gmail)).ToList();
                foreach (var g in data)
                {
                    for (var i = 0; i < g.Users.Count; i++)
                    {
                        var i1 = i;
                        var user = await db.Users.FirstOrDefaultAsync(x => x.Gmail == g.Users[i1]);
                        g.Users[i] = JsonConvert.SerializeObject(user);
                    }
                    for (var i = 0; i < g.Tests.Count; i++)
                    {
                        var i1 = i;
                        var test = await db.Tests.FirstOrDefaultAsync(x => x.Key == g.Tests[i1]);
                        g.Tests[i] = JsonConvert.SerializeObject(test);
                    }
                }
                
                return JsonConvert.SerializeObject(data);
            }
        
    }
}