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
        private readonly IoContext _database;

        public TestController(IoContext userContext)
        {
            _database = userContext;
        }

        public async Task<IActionResult> IndexAsync()
        {
            DataControl control = new DataControl(HttpContext.Request.Cookies);
            if (!control.IsOk || !(await _database.Users.Where(x => x.Id == control.UserData.Id).AnyAsync())) { HttpContext.Response.Redirect("/login"); return View("Empty"); }
            var Key = HttpContext.Request.Query.Keys.FirstOrDefault();
            var IsYes = !string.IsNullOrEmpty(Key);
            if (IsYes) IsYes = await _database.Tests.AnyAsync(x => x.Key == Key);
            if (IsYes) ViewData.Add("Model", await _database.Tests.Where(x => x.Key == Key).FirstOrDefaultAsync());
            var Prohods = await _database.AcceptedLvls.Where(x => x.KEY == Key).Where(x => x.Email == control.UserData.Gmail).AnyAsync();
            if (Key == null)Key = "error";
            var Ended = false;
            if (Prohods) Ended = await _database.AcceptedLvls.Where(x => x.KEY == Key).Where(x => x.Email == control.UserData.Gmail).Where(x => x.IsLast).AnyAsync();
            var NumLast = -1;
            if (!Ended && Prohods) NumLast = await _database.AcceptedLvls.Where(x => x.KEY == Key).Where(x => x.Email == control.UserData.Gmail).MaxAsync(x => x.Num);

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