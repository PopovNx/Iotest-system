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
            public async Task<string> Invoke(HttpContext context, IoContext dataBase, DataControl control)
            {
                if (!control.IsOk) return "error";
                var gmail = control.UserData.Gmail;
                var Result = await dataBase.Groups.Select(x=>x).ToArrayAsync();
                var data = Result.Where(x => x.Admin == gmail || x.Users.Contains(gmail)).ToList();
                return JsonConvert.SerializeObject(data);
            }
        
    }
}