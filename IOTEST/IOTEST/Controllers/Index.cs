using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace IOTEST.Controllers
{
    [Route("/")]
    public class IndexController : Controller
    {
        public IActionResult Index()
        {
            DataControl control = new DataControl(HttpContext.Request.Cookies);
            ViewData.Add("Title", "IOTEST");
            ViewData.Add("ParalaxOn", true);
            ViewData.Add("CSS", new List<string> { "css/Index.css" });
            ViewData.Add("JSU", new List<string> { "VueComponents/InstallCompoonents.js" });
            ViewData.Add("JSD", new List<string> { "js/Index.js" });
            ViewData.Add("User", control.UserData);

            return View("Index");
        }
    }
}
