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
        public async static Task Invoke(HttpContext context)
        {
            var Token = context.Request.Form["IDToken"];
            File.WriteAllText("D:\\ConsoleOutput.txt",JsonConvert.SerializeObject(Token));
            var Finded = DataBase.Users.Where(x => x.Token == Token);
            if (Finded.Any())
            {
                File.WriteAllText("D:\\ConsoleOutput.txt", JsonConvert.SerializeObject(Finded.First()));
            }
            else
            {
                var User = new User();
                User.FirstName = context.Request.Form["GivenName"];
                User.FamilyName = context.Request.Form["FamilyName"];
                User.Image = context.Request.Form["ImageURL"];
                User.Gmail = context.Request.Form["Email"];
                User.Token = Token;
                File.WriteAllText("D:\\ConsoleOutput.txt", JsonConvert.SerializeObject("register"));

                await DataBase.Register(User);
            }


        }

    }
}
