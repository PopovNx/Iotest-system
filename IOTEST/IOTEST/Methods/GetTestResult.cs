using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace IOTEST
{
    public partial class Methods
    {
        public class GetTestResult : IMethod
        {
            public async Task<string> Invoke(HttpContext context, IoContext DataBase, DataControl control)
            {
                if (!control.IsOk || !context.Request.Form.ContainsKey("Key")) return "error";
                var Key = context.Request.Form["Key"].ToString();
                
                var Result = await DataBase.AcceptedLvls.Where(x => x.KEY == Key).ToListAsync();
                var Data = new List<dynamic>();
                foreach (var item in Result.Where(x=>x.IsLast))
                {
                    var Dict = new Dictionary<string, string>();
                    Dict["Key"] = Key;
                    Dict["Gmail"] = item.Email;
                    var data = await new GetBals().InvokeInside(DataBase, Dict);
                    Data.Add((item,data));
                }
                return JsonConvert.SerializeObject(Data);
            }
        }
    }
}