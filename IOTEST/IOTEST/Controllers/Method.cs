﻿using System;
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
        public IActionResult Post()
        {
            var Data = HttpContext.Request.Form;
            var Method = Data["method"];
            return View();
        }
    }
}
