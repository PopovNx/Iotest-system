using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using static IOTEST.Database.UserContext;

namespace IOTEST
{
    public static class Crypt
    {

        static public string GetHash(string input)
        {
            byte[] hash = Encoding.UTF8.GetBytes(input);
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] hashenc = md5.ComputeHash(hash);
            string result = "";
            foreach (var b in hashenc)
            {
                result += b.ToString("x2");
            }
            return result;
        }
        private static string Key = "9519F155D2EC132F18319EBAF522A806";
        private static string CreateMD5(string input)
        {
            using (MD5 md5 = MD5.Create())
            {
                byte[] inputBytes = Encoding.ASCII.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString();
            }
        }
        private static class AesOperation
        {
            public static string EncryptString(string key, string plainText)
            {
                byte[] iv = new byte[16];
                byte[] array;

                using (Aes aes = Aes.Create())
                {
                    aes.Key = Encoding.UTF8.GetBytes(key);
                    aes.IV = iv;

                    ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, encryptor, CryptoStreamMode.Write))
                        {
                            using (StreamWriter streamWriter = new StreamWriter((Stream)cryptoStream))
                            {
                                streamWriter.Write(plainText);
                            }

                            array = memoryStream.ToArray();
                        }
                    }
                }

                return Convert.ToBase64String(array);
            }

            public static string DecryptString(string key, string cipherText)
            {
                byte[] iv = new byte[16];
                byte[] buffer = Convert.FromBase64String(cipherText);

                using (Aes aes = Aes.Create())
                {
                    aes.Key = Encoding.UTF8.GetBytes(key);
                    aes.IV = iv;
                    ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                    using (MemoryStream memoryStream = new MemoryStream(buffer))
                    {
                        using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader streamReader = new StreamReader((Stream)cryptoStream))
                            {
                                return streamReader.ReadToEnd();
                            }
                        }
                    }
                }
            }
        }
        static public string Code(string str)
        {
            var T1 = AesOperation.EncryptString(Key, str);
            return T1 + CreateMD5(T1);
        }
        static public string Decode(string str)
        {
            var T1 = str.Substring(0, str.Length - 32);
            var MD5ha = str.Substring(str.Length - 32);
            if (MD5ha == CreateMD5(T1))
            {
                return AesOperation.DecryptString(Key, T1);
            }
            else
            {
                return null;
            }


        }

    }
    public class DataControl
    {
        private bool _active;
        private string _CryptStr;
        private User _data;
        static public readonly string CookieName = "Session_Data";
        public bool IsOk { get { return _active; } }
        public User UserData { get { return _data; } set { _data = value; _CryptStr = Crypt.Code(JsonConvert.SerializeObject(_data)); } }
        public DataControl(IRequestCookieCollection cookies)
        {
            _active = cookies.ContainsKey(CookieName);
            if (_active)
            {
                _active = !string.IsNullOrEmpty(cookies[CookieName]);
                if (_active) _CryptStr = cookies[CookieName];
                if (_active)
                {
                    var JsonStr = Crypt.Decode(_CryptStr);
                    _active = !string.IsNullOrEmpty(JsonStr);
                    if (_active)
                    {
                        _data = JsonConvert.DeserializeObject<User>(JsonStr);
                    }
                }
            }
        }
        public DataControl(User data)
        {
            _data = data;
            _CryptStr = Crypt.Code(JsonConvert.SerializeObject(_data));
        }

        public override string ToString()
        {
            _CryptStr = Crypt.Code(JsonConvert.SerializeObject(_data));

            return _CryptStr;
        }

    }
}
