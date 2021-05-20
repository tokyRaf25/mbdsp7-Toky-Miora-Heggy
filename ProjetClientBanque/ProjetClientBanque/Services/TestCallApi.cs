using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ProjetClientBanque.Services
{
    public class TestCallApi
    {

        // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
        public class Value
        {
            public int id { get; set; }
            public string joke { get; set; }
        }

        public class Joke
        {
            public string type { get; set; }
            public Value value { get; set; }
        }



        public static string callApi(string firstname,string lastname)
        {
            WebRequest request = WebRequest.Create("http://api.icndb.com/jokes/random?firstName="+firstname+"&lastName="+lastname);
            WebResponse response = request.GetResponse();
            StreamReader reader = new StreamReader(response.GetResponseStream());
            string Joke_JSON = reader.ReadToEnd();

            Joke myJoke = Newtonsoft.Json.JsonConvert.DeserializeObject<Joke>(Joke_JSON);
            return myJoke.value.joke;

        }
    }
}
