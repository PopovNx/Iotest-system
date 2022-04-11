using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            
            if (!await control.Exist(_database))
                return Redirect("/login");
            var user = await _database.Users.FirstOrDefaultAsync(x => x.Gmail == control.UserData.Gmail);
            if (user is null)
                return Redirect("/login");
            
            var groups = await _database.Groups.ToListAsync();
            var tests = await _database.Tests.ToListAsync();
            var results =await _database.LevelResults.Where(x => x.User == user).ToListAsync();
            var cTests = (results.GroupBy(x => x.Test)
                .Where(lr => lr.Any(x => x.Finish))
                .Select(lr => lr.Key)).ToList();
            
            
            var nxTests = groups.Where(x => x.Users.Contains(user.Gmail))
                .SelectMany(x => x.Tests);
            var testsProd = tests.Where(x => !cTests.Contains(x)).Where(x => nxTests.Contains(x.Key)).ToList();
           
            return View("Index", (user, testsProd));
        }
    }
}