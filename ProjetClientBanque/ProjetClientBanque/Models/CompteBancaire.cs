using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetClientBanque.Models
{
    public class CompteBancaire
    {
        private int id;
        private string numerosdecompte;
        private double soldeencours;
        private string motdepasse;

        public int Id { get => id; set => id = value; }
        public string Numerosdecompte { get => numerosdecompte; set => numerosdecompte = value; }
        public double Soldeencours { get => soldeencours; set => soldeencours = value; }
        public string Motdepasse { get => motdepasse; set => motdepasse = value; }

        public CompteBancaire() { }

        public CompteBancaire(int id, string numerosdecompte, double soldeencours, string motdepasse)
        {
            Id = id;
            Numerosdecompte = numerosdecompte ?? throw new ArgumentNullException(nameof(numerosdecompte));
            Soldeencours = soldeencours;
            Motdepasse = motdepasse ?? throw new ArgumentNullException(nameof(motdepasse));
        }

        public CompteBancaire(string numerosdecompte, double soldeencours, string motdepasse)
        {
            Numerosdecompte = numerosdecompte;
            Soldeencours = soldeencours;
            Motdepasse = motdepasse;
        }

        public CompteBancaire(int id)
        {
            Id = id;
        }
    }
}
