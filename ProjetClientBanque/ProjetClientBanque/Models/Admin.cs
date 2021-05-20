using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetClientBanque.Models
{
    public class Admin
    {
        private int id;
        private string nom;
        private string mdp;

        public int Id { get => id; set => id = value; }
        public string Nom { get => nom; set => nom = value; }
        public string Mdp { get => mdp; set => mdp = value; }

        public Admin(int id, string nom, string mdp)
        {
            Id = id;
            Nom = nom ?? throw new ArgumentNullException(nameof(nom));
            Mdp = mdp ?? throw new ArgumentNullException(nameof(mdp));
        }

        public Admin(string nom, string mdp)
        {
            Nom = nom;
            Mdp = mdp;
        }

        public Admin()
        {

        }
        public Admin(int id)
        {
            Id = id;
        }
    }
}
