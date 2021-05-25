using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ProjetClientBanque.Services
{
    public class CompteBancaireService
    {
        private class MessageValidation
        {
            public bool message { get; set; }
        }

        public bool ifCompteBancaireExist(string numerosBancaire)
        {
            MessageValidation message;
            var url = "http://localhost:8080/Api/comptebancaire?num=" + numerosBancaire;
            var request = (HttpWebRequest)WebRequest.Create(url);
            WebResponse webResponse = request.GetResponse();
            StreamReader reader = new StreamReader(webResponse.GetResponseStream());
            //JObject json_result = JObject.Parse(reader.ReadToEnd());
            message = JsonConvert.DeserializeObject<MessageValidation>(reader.ReadToEnd());
            return message.message;
        }
    }
}
