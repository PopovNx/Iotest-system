using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace IOTEST.Controllers
{
    [Route("/test")]
    public class TestController : Controller
    {
        public IActionResult Index()
        {
            DataControl control = new DataControl(HttpContext.Request.Cookies);
            if (!control.IsOk) { HttpContext.Response.Redirect("/login"); return View("Empty");}

            ViewData.Add("Title", "Тест - ");
            ViewData.Add("ParalaxOn", true);
            ViewData.Add("CSS", new List<string> { "css/Test.css" });
            ViewData.Add("JSU", new List<string> { "lib/Showdown/showdown.min.js", "js/VueComp.js", "lib/Pixijs/pixi.min.js", "TestItems/Classes.js" });
            ViewData.Add("JSD", new List<string> { "js/Test.js" });
            ViewData.Add("User", control.UserData);

            return View("Test");
        }
    }
}
