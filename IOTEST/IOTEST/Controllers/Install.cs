using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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
            ViewData.Add("JSU", new List<string> { "js/VueComp.js" });
            ViewData.Add("JSD", new List<string> { "js/Install.js" });
            return View("Install");
        }
    }
}