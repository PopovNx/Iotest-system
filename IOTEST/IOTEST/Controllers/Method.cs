using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace IOTEST.Controllers
{
    [Route("/method")]
    public partial class MethodController : Controller
    {
        private readonly IoContext _database;
        public MethodController(IoContext context) => _database = context;

        [HttpPost]
        public async Task<string> PostAsync()
        {
            if(!HttpContext.Request.HasFormContentType) return "no Data";
            if (!HttpContext.Request.Form.ContainsKey("method")) return "no method";
            var mName = HttpContext.Request.Form["method"];
            var types = GetType().Assembly.GetTypes();
            var theType = types.Any(x => x.Name == mName);
            if (!theType) return "Method not found";
            var mClass = Activator.CreateInstance(types.First(x => x.Name == mName));

            if (mClass is not Methods.IMethod AMethod) return "Method not found";

            var control = new DataControl(HttpContext.Request.Cookies);
            var ans = await AMethod.Invoke(HttpContext, _database, control);

            return ans;
        }
    }
}