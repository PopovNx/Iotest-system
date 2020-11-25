using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System.IO;

namespace IOTEST
{
    public static class Loger
    {
        public static void Log(object l)
        {
            var Pach = "D:\\ConsoleOutput.txt";
            File.WriteAllText(Pach, File.ReadAllText(Pach) + "\n" + JsonConvert.SerializeObject(l));
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>().UseIIS();
                });
    }
}