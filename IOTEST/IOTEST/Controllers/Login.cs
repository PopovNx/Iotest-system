using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace IOTEST.Controllers
{
    [Route("/login")]
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            ViewData.Add("Title", "IOTEST Login");
            ViewData.Add("ParalaxOn", true);
            ViewData.Add("CSS", new List<string> { "css/Install.css" });
            ViewData.Add("JSU", new List<string> { "VueComponents/InstallCompoonents.js" });
            ViewData.Add("JSD", new List<string> { "js/Login.js" });
            return View("Login");
        }
    }
}
