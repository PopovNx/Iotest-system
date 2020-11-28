using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Threading.Tasks;
namespace IOTEST
{
    public partial class Methods
    {
        public class AboutGroup : IMethod
        {
            public async Task<string> Invoke(HttpContext context, IoContext DataBase, DataControl control)
            {
                if (!control.IsOk || !context.Request.Form.ContainsKey("Key")) return "error";
                var Key = context.Request.Form["Key"].ToString();
                var Group =await DataBase.Groups.FirstOrDefaultAsync(x => x.Key == Key);
                return JsonConvert.SerializeObject(Group);
            }
        }
    }
}