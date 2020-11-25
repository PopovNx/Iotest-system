using Microsoft.AspNetCore.Http;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace IOTEST
{
    public partial class Methods
    {
        public interface IMethod
        {
            public Task<string> Invoke(HttpContext Context, IoContext userContext, DataControl control);
            
        }

    }

}
