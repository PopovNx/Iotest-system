using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOTEST.Controllers
{
    [Route("/")]
    public class IndexController : Controller
    {
        private IoContext Database;

        public IndexController(IoContext userContext)
        {
            Database = userContext;
        }

        public async Task<IActionResult> IndexAsync()
        {
            DataControl control = new DataControl(HttpContext.Request.Cookies);
            if (!control.IsOk || !(await Database.Users.Where(x => x.Id == control.UserData.Id).AnyAsync())) { HttpContext.Response.Redirect("/login"); return View("Empty"); }
            var UserHaveAcceptedTest = await Database.AcceptedLvls.AnyAsync(x => x.Email == control.UserData.Gmail);
            var Tests = new List<IoContext.AcceptedLvl>();

            if (UserHaveAcceptedTest)
                Tests = await Database.AcceptedLvls.Where(x => x.Email == control.UserData.Gmail).ToListAsync();

            ViewData.Add("Tests", Tests);
            ViewData.Add("DataBase", Database);
            ViewData.Add("Control", control);
            ViewData.Add("UserHaveAcceptedTest", UserHaveAcceptedTest);
            ViewData.Add("Title", "IOTEST - Main");
            ViewData.Add("ParalaxOn", true);
            ViewData.Add("CSS", new List<string> { "css/Index.css" });
            ViewData.Add("JSU", new List<string> { "js/VueComp.js" });
            ViewData.Add("JSD", new List<string> { "js/Index.js" });
            ViewData.Add("User", control.UserData);

            return View("Index");
        }
    }
}