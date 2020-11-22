using static IOTEST.Database.UserContext;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using IOTEST.Database;

namespace IOTEST.Methods
{
    public class AuchGoogle : IMethod
    {
        public async Task<string> Invoke(HttpContext context, UserContext userContext)
        {
            var Mail = context.Request.Form["Email"];
            var Finded = userContext.Users.Where(x => x.Gmail == Mail);
            var User = new User();
            if (Finded.Any()) User = Finded.First();
            else
            {
                User.FirstName = context.Request.Form["GivenName"];
                User.FamilyName = context.Request.Form["FamilyName"];
                User.Image = context.Request.Form["ImageURL"];
                User.Gmail = Mail;
                User.Token = context.Request.Form["IDToken"];
                User.UserProf = UserProfType.Unset;
                await userContext.AddAsync(User);
            }
            var DataC = new DataControl(User);
            context.Response.Cookies.Append(DataControl.CookieName, DataC.ToString(), new CookieOptions { Path = "/", Expires = DateTime.Now.AddYears(1) });
            return "OK";
        }

    }
}
