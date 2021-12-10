using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace IOTEST
{
    public static class Crypt
    {
        private const string Key = "9519F155D2EC132F18319EBAF522A806";
        private static string CreateMd5(string input)
        {
            using var md5 = MD5.Create();
            var inputBytes = Encoding.ASCII.GetBytes(input);
            var hashBytes = md5.ComputeHash(inputBytes);
            var sb = new StringBuilder();
            foreach (var T in hashBytes) sb.Append(T.ToString("X2"));
            return sb.ToString();
        }
        private static string EncryptString(string key, string plainText)
        {
            var iv = new byte[16];
            byte[] array;
            using (var aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;
                var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
                using (var memoryStream = new MemoryStream())
                {
                    using (var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                    {
                        using (var streamWriter = new StreamWriter(cryptoStream))
                            streamWriter.Write(plainText);
                        array = memoryStream.ToArray();
                    }
                }
            }

            return Convert.ToBase64String(array);
        }
        private static string DecryptString(string key, string cipherText)
        {
            var iv = new byte[16];
            var buffer = Convert.FromBase64String(cipherText);
            using var aes = Aes.Create();
            aes.Key = Encoding.UTF8.GetBytes(key);
            aes.IV = iv;
            var decrypt = aes.CreateDecryptor(aes.Key, aes.IV);
            using var memoryStream = new MemoryStream(buffer);
            using var cryptoStream = new CryptoStream(memoryStream, decrypt, CryptoStreamMode.Read);
            using var streamReader = new StreamReader(cryptoStream);
            return streamReader.ReadToEnd();
        }
        public static string Code(string str)
        {
            var t1 = EncryptString(Key, str);
            return t1 + CreateMd5(t1);
        }
        public static string Decode(string str)
        {
            var hs = str[..^32];
            string rt = null;
            if (str[^32..] == CreateMd5(hs)) rt = DecryptString(Key, hs);
            return rt;
        }
    }

    public class DataControl
    {
        private string _cryptStr;
        public const string CookieName = "Session_Data";
        public bool IsOk { get; }
        public IoContext.User UserData { get; }
        public DataControl(HttpContext context) : this(context.Request.Cookies)
        {
        }

        public DataControl(IRequestCookieCollection cookies)
        {
            IsOk = cookies.ContainsKey(CookieName);
            if (!IsOk) return;
            IsOk = !string.IsNullOrEmpty(cookies[CookieName]);
            if (!IsOk) return;
            _cryptStr = cookies[CookieName];
            var jsonStr = Crypt.Decode(_cryptStr);
            IsOk = !string.IsNullOrEmpty(jsonStr);
            if (IsOk) UserData = JsonConvert.DeserializeObject<IoContext.User>(jsonStr!);
        }

        public async Task<bool> Exist(IoContext context)
        {
            if (!IsOk) return false;
            var ex = await context.Users.Where(x => x.Id == UserData.Id).AnyAsync();
            return ex;
        }

        public DataControl(IoContext.User data)
        {
            UserData = data;
            _cryptStr = Crypt.Code(JsonConvert.SerializeObject(UserData));
        }

        public override string ToString()
        {
            _cryptStr = Crypt.Code(JsonConvert.SerializeObject(UserData));
            return _cryptStr;
        }
    }
}