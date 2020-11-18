using IOTEST.Items;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace IOTEST.Methods
{
    public static class ImgToBase
    {
        public async static Task<string> Invoke(HttpContext context)
        {
            try
            {
                using (var handler = new HttpClientHandler { Credentials = new NetworkCredential() })
                using (var client = new HttpClient(handler))
                {
                    var bytes = await client.GetByteArrayAsync(context.Request.Form["ImageURL"]);
                    return "data:image/png;base64," + Convert.ToBase64String(bytes);
                }
            }
            catch (Exception)
            {
                return "error";
            }


        }

    }
}
