using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IOTEST.Controllers
{
    [Route("/tests")]
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
            if (user.UserProf != IoContext.User.UserProfType.Teacher)
            {
                HttpContext.Response.Redirect("/");
                return View("Empty");
            }
            return View("TestCreator", user);
        }
    }
}