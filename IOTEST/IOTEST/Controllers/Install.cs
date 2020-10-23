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
            return View("Install");
        }
    }
}
