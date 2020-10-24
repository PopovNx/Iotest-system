using IOTEST.Items;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace IOTEST.Methods
{
    public static class AuchGoogle
    {
        public async static Task<string> Invoke(HttpContext context)
        {
            var Mail = context.Request.Form["Email"];
            Loger.Log(context.Request.Form);
            var Finded = DataBase.Users.Where(x => x.Gmail == Mail);
            var User = new User();
            if (Finded.Any())
            {
                User = Finded.First();
            }
            else
            {

                User.FirstName = context.Request.Form["GivenName"];
                User.FamilyName = context.Request.Form["FamilyName"];
                User.Image = context.Request.Form["ImageURL"];
                User.Gmail = Mail;
                User.Token = context.Request.Form["IDToken"];
                Loger.Log("Register");
                await DataBase.Register(User);


            }
            Loger.Log(User);
            var DataC = new DataControl(User);
            context.Response.Cookies.Append(DataControl.CookieName, DataC.ToString(), new CookieOptions { Path = "/", Expires = DateTime.Now.AddYears(1) });

            return "OK";
        }

    }
}
