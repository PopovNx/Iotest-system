using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace IOTEST.Methods
{
    
        public interface IMethod
        {
            public Task<string> Invoke(HttpContext context, IoContext userContext, DataControl control);
        }
    
}