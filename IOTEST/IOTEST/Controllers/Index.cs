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

            ViewData.Add("Title", "IOTEST");
            ViewData.Add("ParalaxOn", true);
            ViewData.Add("CSS", new List<string> {  });
            ViewData.Add("JSU", new List<string> {  });
            ViewData.Add("JSD", new List<string> {  });
            return View("Index");
        }
    }
}
