using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetClientBanque.Services
{
    public class AuthService
    {
        public int Login(string username,string password)
        {
            int reponse = 0;
            if (username.Equals("admin") && password.Equals("admin"))
            {
                reponse = 1;
            }
            return reponse;
        }
    }
}
