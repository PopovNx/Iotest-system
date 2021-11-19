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
            {
                HttpContext.Response.Redirect("/login");
                return View("Empty");
            }
            var user = await _database.Users.FirstAsync(x => x.Id == control.UserData.Id);
            
            return View("Index", user);
        }
    }
}