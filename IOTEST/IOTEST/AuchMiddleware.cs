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

        public Task Invoke(HttpContext context)
        {
            var Pach = context.Request.Path;
            DataControl control = new DataControl(context.Request.Cookies);
            if (!control.IsOk) { if (Pach != "/login"&&Pach != "/install") { context.Response.Redirect("/login"); } }
            else
            {

            }

            return _next(context);
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
