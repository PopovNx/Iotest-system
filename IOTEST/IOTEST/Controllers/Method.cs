using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using static IOTEST.Methods;

namespace IOTEST.Controllers
{
    [Route("/method")]
    public partial class MethodController : Controller
    {
        private IoContext Database;

        public MethodController(IoContext context) => Database = context;

        [HttpPost]
        public async Task<string> PostAsync()
        {
            if (HttpContext.Request.Form == null || !HttpContext.Request.Form.ContainsKey("method")) return "Lol";
            var theType = GetType().Assembly.GetTypes().FirstOrDefault(x => x.Name == HttpContext.Request.Form["method"]);
            if (theType == null) return "Not Method";
            return await ((IMethod)Activator.CreateInstance(theType)).Invoke(HttpContext, Database, new DataControl(HttpContext.Request.Cookies));
        }
    }
}