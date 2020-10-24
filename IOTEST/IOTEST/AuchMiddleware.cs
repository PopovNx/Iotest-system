using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace IOTEST
{
    public class AuchMiddleware
    {
        private readonly RequestDelegate _next;
        public AuchMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var Pach = context.Request.Path;
          
            DataControl control = new DataControl(context.Request.Cookies);
            if (!control.IsOk) { if (Pach != "/login" && Pach != "/install") { context.Response.Redirect("/login"); } }
            else
            {
                if (DataBase.Users.Where((x) => x.Gmail == control.UserData.Gmail).Count() != 1) { context.Response.Cookies.Delete(DataControl.CookieName); context.Response.Redirect($"/login"); }
                if (Pach == "/login") context.Response.Redirect("/");
               

            }

            await _next(context);
        }
    }

    public static class AuchMiddlewareExtensions
    {
        public static IApplicationBuilder UseAuchMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuchMiddleware>();
        }
    }
}
