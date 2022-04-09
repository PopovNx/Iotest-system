using System;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace IOTEST.Controllers
{
    [Route("/testCreator/{testKey}/{id}")]
    public class TestCreator : Controller
    {
        private readonly IoContext _database;
        public TestCreator(IoContext userContext) => _database = userContext;

        public async Task<ActionResult> IndexAsync([CanBeNull] string testKey, int id)
        {
            var control = new DataControl(HttpContext.Request.Cookies);
            if (!await control.Exist(_database))
            {
                HttpContext.Response.Redirect("/login");
                return View("Empty");
            }
            var user = await _database.Users.FirstAsync(x => x.Id == control.UserData.Id);
            
            if (testKey != null  && user.UserProf == IoContext.User.UserProfType.Teacher && testKey.Length>1 && await _database.Tests.AnyAsync(x => x.Key == testKey))
            {
                var test = await _database.Tests.FirstAsync(x => x.Key == testKey);
                
                return View("TestCreator", (user, test.Key, id ));
            }
            else
            {
                return Redirect("/");
            }
        }
    }
}