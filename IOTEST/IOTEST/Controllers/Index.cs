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
            var NTests = new List<IoContext.Test>();

            if (UserHaveAcceptedTest)
                Tests = await Database.AcceptedLvls.Where(x => x.Email == control.UserData.Gmail).ToListAsync();


            var UserInGroups = (await Database.Groups.ToListAsync()).Any(x => x.Users.Contains(control.UserData.Gmail));
            var TestsToProh = new List<string>();
            if (UserInGroups)
                TestsToProh = (await Database.Groups.ToListAsync()).Where(x => x.Users.Contains(control.UserData.Gmail)).Select(x => x.Key).ToList();

            NTests = (await Database.Tests.ToListAsync());
            NTests = NTests.Where(x => !Tests.Any(y => y.KEY == x.KEY)).ToList();


            ViewData.Add("Tests", Tests);
            ViewData.Add("NTests", NTests);
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