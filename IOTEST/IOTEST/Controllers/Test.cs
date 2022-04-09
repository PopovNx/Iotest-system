using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOTEST.Controllers
{
    public class TestController : Controller
    {
        private readonly IoContext _database;
        public TestController(IoContext userContext) => _database = userContext;
        [Route("/test/{Key}")]
        public async Task<IActionResult> IndexAsync(string key)
        {
            var control = new DataControl(HttpContext.Request.Cookies);
            if (!await control.Exist(_database))
                return new RedirectResult("/login");
            var test = await _database.Tests.FirstOrDefaultAsync(x => x.Key == key);
            var user = await _database.Users.FirstAsync(x => x.Id == control.UserData.Id);

            if (test is null)
                return new RedirectResult("/");

            var results = await _database.LevelResults.Where(x => x.User == user).Where(x => x.Test == test).ToListAsync();
            
            return View("Test",  (user, test,results));
        }
        [Route("/test/")]
        public async Task<IActionResult> IndexNoAsync()
        {
            var control = new DataControl(HttpContext.Request.Cookies);
            if (!await control.Exist(_database))
                return new RedirectResult("/login");
            
            return new RedirectResult("/");
        }
    }
}