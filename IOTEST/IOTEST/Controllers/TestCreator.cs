using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace IOTEST.Controllers
{
    [Route("/testCreator")]
    public class TestCreator : Controller
    {
        private readonly IoContext _database;
        public TestCreator(IoContext userContext) => _database = userContext;

        public async Task<ActionResult> IndexAsync()
        {
            var control = new DataControl(HttpContext.Request.Cookies);
            if (!await control.Exist(_database))
            {
                HttpContext.Response.Redirect("/login");
                return View("Empty");
            }

            var user = await _database.Users.FirstAsync(x => x.Id == control.UserData.Id);
            if (user.UserProf == IoContext.User.UserProfType.Teacher
                && HttpContext.Request.Query.TryGetValue("test", out var key)
                && HttpContext.Request.Query.TryGetValue("id", out var id)
                && await _database.Tests.AnyAsync(x => x.Key == key.ToString()))
            {
                var test = await _database.Tests.FirstAsync(x => x.Key == key.ToString());
                
                return View("TestCreator", (user, test, int.Parse(id.ToString()) ));
            }
            else
            {
                HttpContext.Response.Redirect("/");
                return View("Empty");
            }
        }
    }
}