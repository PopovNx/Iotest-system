using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOTEST.Controllers
{
    [Route("/test")]
    public class TestController : Controller
    {
        private IoContext Database;

        public TestController(IoContext userContext)
        {
            Database = userContext;
        }

        public async Task<IActionResult> IndexAsync()
        {
            DataControl control = new DataControl(HttpContext.Request.Cookies);
            if (!control.IsOk || !(await Database.Users.Where(x => x.Id == control.UserData.Id).AnyAsync())) { HttpContext.Response.Redirect("/login"); return View("Empty"); }
            var Key = HttpContext.Request.Query.Keys.FirstOrDefault();
            var IsYes = !string.IsNullOrEmpty(Key);
            if (IsYes) IsYes = await Database.Tests.AnyAsync(x => x.KEY == Key);
            if (IsYes) ViewData.Add("Model", await Database.Tests.Where(x => x.KEY == Key).FirstOrDefaultAsync());
            var Prohods = await Database.AcceptedLvls.Where(x => x.KEY == Key).Where(x => x.Email == control.UserData.Gmail).AnyAsync();
            if (Key == null)Key = "error";
            var Ended = false;
            if (Prohods) Ended = await Database.AcceptedLvls.Where(x => x.KEY == Key).Where(x => x.Email == control.UserData.Gmail).Where(x => x.IsLast).AnyAsync();
            var NumLast = -1;
            if (!Ended && Prohods) NumLast = await Database.AcceptedLvls.Where(x => x.KEY == Key).Where(x => x.Email == control.UserData.Gmail).MaxAsync(x => x.Num);

            ViewData.Add("Prohods", Prohods);
            ViewData.Add("Ended", Ended);
            ViewData.Add("NumLast", NumLast);
            ViewData.Add("Key", Key);

            ViewData.Add("IsOkUrl", IsYes);
            ViewData.Add("Title", $"Тест - {(Key.Length > 1 ? Key : "error")}");
            ViewData.Add("ParalaxOn", true);
            ViewData.Add("CSS", new List<string> { "css/Test.css" });
            ViewData.Add("JSU", new List<string> { "lib/Showdown/showdown.min.js", "lib/Pixijs/pixi.min.js", "js/VueComp.js" });
            ViewData.Add("JSD", new List<string> { "js/Test.js" });
            ViewData.Add("User", control.UserData);

            return View("Test");
        }
    }
}