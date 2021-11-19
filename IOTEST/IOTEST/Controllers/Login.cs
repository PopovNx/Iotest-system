using Microsoft.AspNetCore.Mvc;

namespace IOTEST.Controllers
{
    [Route("/login")]
    public class LoginController : Controller
    {
        public IActionResult Index() => View("Login");
    }
}