using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using IOTEST;
using IOTEST.Methods;
using Microsoft.AspNetCore.Mvc;

namespace IOTEST.Controllers
{

    [Route("/method")]
    public class MethodController : Controller
    {
        private IoContext UserDb;

        public MethodController(IoContext context)
        {
            UserDb = context;
        }
        [HttpPost]
        public async Task<string> PostAsync()
        {
            DataControl control = new DataControl(HttpContext.Request.Cookies);

            var Method = HttpContext.Request.Form["method"];
            var Return = "";
            switch (Method)
            {
                case "AuchGoogle":
                    return await ((IMethod)new AuchGoogle()).Invoke(HttpContext, UserDb);
                default:
                    break;
            }


            return Return;
        }
    }
}
