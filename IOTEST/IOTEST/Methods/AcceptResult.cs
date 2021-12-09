using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
namespace IOTEST.Methods
{
  
    [UsedImplicitly]
        public class AcceptResult : IMethod
        {
            public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
            {
                if (!control.IsOk 
                    || !context.Request.Form.ContainsKey("TestKey") 
                    || !context.Request.Form.ContainsKey("Index") 
                    || !context.Request.Form.ContainsKey("Finish") 
                    || !context.Request.Form.ContainsKey("Data")) return "error";
                
                var testKey = context.Request.Form["TestKey"].ToString();
                
                var indexCorrect = int.TryParse(context.Request.Form["Index"].ToString(), out var levelIndex);
                if (!indexCorrect) return "test index error";
                
                var test =await db.Tests.FirstOrDefaultAsync(x => x.Key == testKey);
                if (test is null) return "test key error";
                
                var user =await db.Users.FirstOrDefaultAsync(x => x.Gmail == control.UserData.Gmail);
                
                var finishCorrect = bool.TryParse(context.Request.Form["Finish"].ToString(), out var finish);
                if (!finishCorrect) return "finish error";
                
                var data = JsonConvert.DeserializeObject<IoContext.LevelResult.ResultData>(context.Request.Form["Data"]);
                
                var res = new IoContext.LevelResult
                {
                    Test = test,
                    User = user,
                    Finish = finish,
                    LevelIndex = levelIndex,
                    JsonData = JsonConvert.SerializeObject(data),
                    Created = DateTime.Now
                };
                if (db.LevelResults.Any(x => x.User == user && x.Test == test && x.LevelIndex == levelIndex))
                {
                    return "error";
                }
                
                await db.LevelResults.AddAsync(res);

                await db.SaveChangesAsync();
                return "OK";
            }
        
    }
}