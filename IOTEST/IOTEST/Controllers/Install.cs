using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace IOTEST.Controllers
{
    [Route("/install")]
    public class InstallController : Controller
    {
        public IActionResult Index()
        {
            ViewData.Add("Title", "IOTEST Install");
            ViewData.Add("ParalaxOn", true);
            ViewData.Add("CSS", new List<string> { "css/Install.css" });
            ViewData.Add("JSU", new List<string> { "VueComponents/InstallCompoonents.js" });
            ViewData.Add("JSD", new List<string> { "js/Install.js" });
            return View("Install");
        }
    }
}
