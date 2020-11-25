using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace IOTEST
{
    public class AuchMiddleware
    {
        private readonly RequestDelegate _next;

        public AuchMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IoContext userContext)
        {
            // await _next(context);return;
            var Pach = context.Request.Path;

            DataControl control = new DataControl(context.Request.Cookies);
            if (!control.IsOk)
            {
                if (Pach != "/login" && Pach != "/install")
                {
                    context.Response.Redirect("/install");
                }
            }
            else
            {
                if (await userContext.Users.Where((x) => x.Gmail == control.UserData.Gmail).CountAsync() != 1) { context.Response.Cookies.Delete(DataControl.CookieName); context.Response.Redirect($"/login"); }
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