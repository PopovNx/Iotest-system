using static IOTEST.IoContext;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using IOTEST;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace IOTEST
{
    public partial class Methods
    {
        public class GetBals : IMethod

        {
            public async Task<string> Invoke(HttpContext context, IoContext DataBase, DataControl control)
            {
                if (!control.IsOk) return "error";

                var key = context.Request.Form["Key"].ToString();
                var Mail = control.UserData.Gmail;
                var Results = await DataBase.AcceptedLvls.Where(x => x.KEY == key).Where(x => x.Email == Mail).Select(x => x.Result).ToListAsync();
                var Bal = 0;
                foreach (var result in Results)
                {
                    if (result.Rule == "SumPass")
                    {
                        Bal += result.Result >= result.Settings ? result.Max : 0;
                    }
                    else
                    {
                        Bal += result.Result * result.Max / result.Settings;
                    }

                }
                return Bal.ToString();
            }

            public async Task<string> InvokeInside(IoContext DataBase, Dictionary<string, string> data)
            {
                var Results = await DataBase.AcceptedLvls.Where(x => x.KEY == data["Key"]).Where(x => x.Email == data["Gmail"]).Select(x => x.Result).ToListAsync();
                var Bal = 0;
                foreach (var result in Results)
                    if (result.Rule == "SumPass")
                        Bal += result.Result >= result.Settings ? result.Max : 0;
                    else
                        Bal += result.Result * result.Max / result.Settings;
                return Bal.ToString();
            }
        }
    }
}
