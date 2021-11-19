using System;
using System.Text;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
namespace IOTEST.Methods
{
  
    [UsedImplicitly]
        public class AcceptResult : IMethod
        {
            public async Task<string> Invoke(HttpContext context, IoContext userContext, DataControl control)
            {
                if (!control.IsOk || !context.Request.Form.ContainsKey("Test") || !context.Request.Form.ContainsKey("Num") || !context.Request.Form.ContainsKey("Last") || !context.Request.Form.ContainsKey("Data")) return "error";
                var Res = new IoContext.AcceptedLvl
                {
                    Email = control.UserData.Gmail,
                    KEY = context.Request.Form["Test"],
                    Num = int.Parse(context.Request.Form["Num"]),
                    IsLast = bool.Parse(context.Request.Form["Last"]),
                    Result = JsonConvert.DeserializeObject<IoContext.AcceptedLvl.ResultData>(Encoding.UTF8.GetString(Convert.FromBase64String(context.Request.Form["Data"]))),
                    Created = DateTime.Now
                };
                await userContext.AcceptedLvls.AddAsync(Res);

                Console.WriteLine(JsonConvert.SerializeObject(Res));

                await userContext.SaveChangesAsync();
                return "OK";
            }
        
    }
}