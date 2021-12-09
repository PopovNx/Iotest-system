using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace IOTEST.Methods
{
    [UsedImplicitly]
    public class GetMark : IMethod

    {
        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk && !context.Request.Form.ContainsKey("TestKey")) return "error";
            var testKey = context.Request.Form["TestKey"].ToString();
            var test = await db.Tests.FirstOrDefaultAsync(x => x.Key == testKey);
            if (test is null) return "test key error";
            var user = await db.Users.FirstOrDefaultAsync(x => x.Gmail == control.UserData.Gmail);
            var results = await db.LevelResults.Where(x => x.User == user).Where(x => x.Test == test).ToListAsync();
            if (!results.Any(x => x.Finish)) return "NotFinish";
            var result = Calculate(results) * 100;
            return $"{result:F1}%";
        }

        public static double Calculate(IEnumerable<IoContext.LevelResult> data)
        {
            var ansS = data
                .Select(element => JsonConvert.DeserializeObject<IoContext.LevelResult.ResultData>(element.JsonData))
                .ToList();
            var numbers = new List<double>();
            foreach (var ga in ansS)
            {
                var n = ga.Correct;
                var n1 = ga.Result;
                var sss = (1d / n.Count);
                var s = 0d;
                var k1 = 0;
                for (var i = 0; i < n.Count; i++)
                {
                    n1[i].Sort();
                    for (var j = 0; j < n[i].Count; j++)
                    for (var k = 0; k < n1[i].Count; k++)
                        if (n[i][j] == n1[i][k])
                            k1++;
                    double ss = k1 == n[i].Count ? 1 : (1 / n[i].Count) * k1;
                    k1 = 0;
                    s += ss * sss;
                }
                numbers.Add(s);
            }

            return numbers.Sum() / numbers.Count;
        }
    }
}