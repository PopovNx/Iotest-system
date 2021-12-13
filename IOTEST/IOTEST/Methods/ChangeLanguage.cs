using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace IOTEST.Methods
{
    [UsedImplicitly]
    public class ChangeLanguage : IMethod
    {

        public async Task<string> Invoke(HttpContext context, IoContext db, DataControl control)
        {
            if (!control.IsOk || !context.Request.Form.ContainsKey("value")) return "error";
            var gmail = control.UserData.Gmail;
            var user = await db.Users.FirstOrDefaultAsync(x => x.Gmail == gmail);
            switch (context.Request.Form["value"].ToString())
            {
                case "0":
                    user.Lang = IoContext.User.Languages.Ukrainian;
                    break;
                case "1":
                    user.Lang = IoContext.User.Languages.Russian;
                    break;
                case "2":
                    user.Lang = IoContext.User.Languages.English;
                    break;
                default:
                    return "Error";
            }
            await db.SaveChangesAsync();
            return "Ok";
        }
    }
}