using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using IOTEST;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace IOTEST.Controllers
{
    [Route("/test")]
    public class TestController : Controller
    {
        private IoContext Database;
        public TestController(IoContext userContext)
        {
           Database = userContext;
        }
        public async Task<IActionResult> IndexAsync()
        {
            DataControl control = new DataControl(HttpContext.Request.Cookies);
            if (!control.IsOk || !(await Database.Users.Where(x => x.Id == control.UserData.Id).AnyAsync())) { HttpContext.Response.Redirect("/login"); return View("Empty"); }

            var Key = HttpContext.Request.Query.Keys.FirstOrDefault();
            var IsYes = !string.IsNullOrEmpty(Key);
            if (IsYes) IsYes= await Database.Tests.AnyAsync(x => x.KEY == Key);
            if (IsYes)  ViewData.Add("Model",await Database.Tests.Where(x => x.KEY == Key).FirstOrDefaultAsync());
            ViewData.Add("IsOkUrl", IsYes);
            ViewData.Add("Title", "Тест - ");
            ViewData.Add("ParalaxOn", true);
            ViewData.Add("CSS", new List<string> { "css/Test.css" });
            ViewData.Add("JSU", new List<string> { "lib/Showdown/showdown.min.js", "lib/Pixijs/pixi.min.js", "js/VueComp.js" });
            ViewData.Add("JSD", new List<string> { "js/Test.js" });
            ViewData.Add("User", control.UserData);
   
            return View("Test");
        }
    }
}
