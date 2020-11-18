using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace IOTEST.Controllers
{
    [Route("/method")]
    public class MethodController : Controller
    {
        [HttpPost]
        public async Task<string> PostAsync()
        {
            DataControl control = new DataControl(HttpContext.Request.Cookies);

            var Method = HttpContext.Request.Form["method"];
            var Return = "";
            switch (Method)
            {
                case "AuchGoogle":
                    return await Methods.AuchGoogle.Invoke(HttpContext);
                case "ImgToBase":
                    return await Methods.ImgToBase.Invoke(HttpContext);
                default:
                    break;
            }


            return Return;
        }
    }
}
