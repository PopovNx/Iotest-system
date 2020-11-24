using static IOTEST.IoContext;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using IOTEST;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace IOTEST
{
    public partial class Methods
    {
        public class AcceptResult : IMethod
        {
            public async Task<string> Invoke(HttpContext context, IoContext userContext, DataControl control)
            {

                var Res = new AcceptedLvl
                {
                    Email = control.UserData.Gmail,
                    KEY = context.Request.Form["Test"],
                    Num = int.Parse(context.Request.Form["Num"]),
                    IsLast = bool.Parse(context.Request.Form["Last"]),
                    Result = JsonConvert.DeserializeObject<AcceptedLvl.ResultData>(Encoding.UTF8.GetString(Convert.FromBase64String(context.Request.Form["Data"])))
                };
                await userContext.AcceptedLvls.AddAsync(Res);
                
                Console.WriteLine(JsonConvert.SerializeObject(Res));

                await userContext.SaveChangesAsync();
                return "OK";
            }

        }
    }
}
