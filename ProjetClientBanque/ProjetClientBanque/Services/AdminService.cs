using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ProjetClientBanque.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ProjetClientBanque.Services
{
    public class AdminService
    {

        public async Task<bool> LoginAsync(string username, string password)
        {
            bool is_authentificated = false;
            var values = new Dictionary<string, string>
            {
                { "nom", username },
                { "motdepasse", password }
            };

            var json = JsonConvert.SerializeObject(values);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            var url = "http://localhost:8080/Api/adminAuthentifacte";
            using var client = new HttpClient();

            var response = await client.PostAsync(url, data);

            var contents = await response.Content.ReadAsStringAsync();
            JObject json_result = JObject.Parse(contents);
            if (json_result.Count == 3)
            {
                is_authentificated = true;
            }
            return is_authentificated;
        }
    }
}
