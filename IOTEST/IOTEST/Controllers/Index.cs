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
        private readonly IoContext _database;
        public IndexController(IoContext userContext) => _database = userContext;

        public async Task<IActionResult> IndexAsync()
        {
            var control = new DataControl(HttpContext.Request.Cookies);
            
            if (!control.IsOk || !(await _database.Users.Where(x => x.Id == control.UserData.Id).AnyAsync()))
            {
                HttpContext.Response.Redirect("/login");
                return View("Empty");
            }

            var UserHaveAcceptedTest = await _database.AcceptedLvls.AnyAsync(x => x.Email == control.UserData.Gmail);

            var Tests = new List<IoContext.AcceptedLvl>();
            var NTests = new List<IoContext.Test>();

            if (UserHaveAcceptedTest)
                Tests = await _database.AcceptedLvls.Where(x => x.Email == control.UserData.Gmail).ToListAsync();


            var UserInGroups = (await _database.Groups.ToListAsync()).Any(x =>
                x.Users.Contains(control.UserData.Gmail) || x.Admin == control.UserData.Gmail);
            var TestsToProh = new List<List<string>>();
            if (UserInGroups)
                TestsToProh = (await _database.Groups.ToListAsync())
                    .Where(x => x.Users.Contains(control.UserData.Gmail) || x.Admin == control.UserData.Gmail)
                    .Select(x => x.Tests).ToList();

            NTests = (await _database.Tests.ToListAsync());
            NTests = NTests.Where(x => !Tests.Any(y => y.KEY == x.KEY))
                .Where(x => TestsToProh.Any(y => y.Contains(x.KEY))).ToList();


            ViewData.Add("Tests", Tests);
            ViewData.Add("NTests", NTests);
            ViewData.Add("DataBase", _database);
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