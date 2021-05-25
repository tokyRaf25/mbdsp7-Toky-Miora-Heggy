using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ProjetClientBanque.Services
{
    public class MouvementBancaireService
    {
        private class MessageValidation
        {
            public string message { get; set; }
        }

        public async Task<string> doTransaction(double somme, string motdepasse, string numerosdecompte, string typeMouvement)
        {
            string is_authentificated = "";
            var values = new Dictionary<string, object>
            {
                { "somme", somme },
                { "motdepasse", motdepasse },
                { "numerosdecompte", numerosdecompte },
                { "typeMouvement", typeMouvement }
            };

            var json = JsonConvert.SerializeObject(values);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            var url = "http://localhost:8080/Api/mouvementbancaire";
            using var client = new HttpClient();

            var response = await client.PostAsync(url, data);

            var contents = await response.Content.ReadAsStringAsync();
            JObject json_result = JObject.Parse(contents);
            /*if (json_result.Count == 3)
            {
                is_authentificated = true;
            }*/
            return is_authentificated;
        }
    }
}
