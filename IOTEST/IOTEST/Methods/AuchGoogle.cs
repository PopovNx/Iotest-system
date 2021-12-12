using System;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
namespace IOTEST.Methods
{
    [UsedImplicitly]
        public class AuchGoogle : IMethod
        {
            public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
            {
                var mail = context.Request.Form["Email"].ToString();
                if (string.IsNullOrEmpty(mail)) return "NotOk";
                var isAny = await db.Users.AnyAsync(x => x.Gmail == mail);
                var user = new IoContext.User();
                if (isAny)
                {
                    user = await db.Users.Where(x => x.Gmail == mail).FirstOrDefaultAsync();
                } 
                else
                {

                    user.Created = DateTime.Now;
                    user.FirstName = context.Request.Form["GivenName"];
                    user.FamilyName = context.Request.Form["FamilyName"];
                    user.Image = context.Request.Form["ImageURL"];
                    user.Gmail = mail;
                    user.Token = context.Request.Form["IDToken"];
                    user.UserProf = IoContext.User.UserProfType.User;
                    user.Lang = IoContext.User.Languages.Ukrainian;
                    if (user.FamilyName == "undefined")
                    {
                        user.FamilyName = "";
                    }
                    await db.AddAsync(user);
                    await db.SaveChangesAsync();
                }
                var dataC = new DataControl(user);
                context.Response.Cookies.Append(DataControl.CookieName, dataC.ToString(), new CookieOptions { Path = "/", Expires = DateTime.Now.AddYears(1) });
                return "OK";
            }
        }
    
}