using IOTEST.Database;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IOTEST.Methods
{
    interface IMethod
    {
       public Task<string> Invoke(HttpContext Context, UserContext userContext );
    }
}
