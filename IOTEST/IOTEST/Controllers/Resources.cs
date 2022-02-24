using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IOTEST.Controllers
{
    [Route("/resources")]
    public class Resources : Controller 
    {
        private readonly IoContext _database;
        public Resources(IoContext userContext) => _database = userContext;

        public async Task<ActionResult> IndexAsync()
        {
            var control = new DataControl(HttpContext);
            
            if (!await control.Exist(_database))
                return new RedirectResult("/login");
            
            var user = await _database.Users.FirstAsync(x => x.Id == control.UserData.Id);
            
            if (user.UserProf != IoContext.User.UserProfType.Teacher)
                return new RedirectResult("/");


            return View("Resources", user);
        }
    }
}