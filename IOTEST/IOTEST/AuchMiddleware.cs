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

        public Task Invoke(HttpContext httpContext)
        {



            return _next(httpContext);
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
