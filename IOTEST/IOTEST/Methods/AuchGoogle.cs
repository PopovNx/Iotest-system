using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using static IOTEST.IoContext;

namespace IOTEST
{
    public partial class Methods
    {
        public class AuchGoogle : IMethod
        {
            public async Task<string> Invoke(HttpContext context, IoContext userContext, DataControl control)
            {
                var Mail = context.Request.Form["Email"].ToString();
                if (string.IsNullOrEmpty(Mail)) return "NotOk";
                var IsAny = await userContext.Users.AnyAsync(x => x.Gmail == Mail);
                var User = new User();
                if (IsAny)
                {
                    User = await userContext.Users.Where(x => x.Gmail == Mail).FirstOrDefaultAsync();
                }
                else
                {
                    User.FirstName = context.Request.Form["GivenName"];
                    User.FamilyName = context.Request.Form["FamilyName"];
                    User.Image = context.Request.Form["ImageURL"];
                    User.Gmail = Mail;
                    User.Token = context.Request.Form["IDToken"];
                    User.UserProf = UserProfType.Unset;
                    await userContext.AddAsync(User);
                    await userContext.SaveChangesAsync();
                }
                var DataC = new DataControl(User);
                context.Response.Cookies.Append(DataControl.CookieName, DataC.ToString(), new CookieOptions { Path = "/", Expires = DateTime.Now.AddYears(1) });
                return "OK";
            }
        }
    }
}