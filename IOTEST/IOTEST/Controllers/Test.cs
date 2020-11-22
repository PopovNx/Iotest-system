using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IOTEST.Database;
using Microsoft.AspNetCore.Mvc;

namespace IOTEST.Controllers
{
    [Route("/test")]
    public class TestController : Controller
    {
        private UserContext db;

        public TestController(UserContext context)
        {
            db = context;
        }
        public IActionResult Index()
        {
            DataControl control = new DataControl(HttpContext.Request.Cookies);
            if (!control.IsOk || !db.Users.Where(x => x.Id == control.UserData.Id).Any()) { HttpContext.Response.Redirect("/login"); return View("Empty"); }

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
