using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetClientBanque.Models
{
    public class MouvementBancaire
    {
        public enum TypeMouvement
        {
           CREDIT,DEBIT
        }

        private int id;
        private TypeMouvement typeMouvement;
        private CompteBancaire compteBancaire;
        private DateTime dateMouvement;
        private double somme;

        public int Id { get => id; set => id = value; }
        public DateTime DateMouvement { get => dateMouvement; set => dateMouvement = value; }
        public double Somme { get => somme; set => somme = value; }
        public CompteBancaire CompteBancaire { get => compteBancaire; set => compteBancaire = value; }
        public TypeMouvement TypeMouvement1 { get => typeMouvement; set => typeMouvement = value; }

        public MouvementBancaire(int id, DateTime dateMouvement, double somme, CompteBancaire compteBancaire, TypeMouvement typeMouvement1) : this(id)
        {
            DateMouvement = dateMouvement;
            Somme = somme;
            CompteBancaire = compteBancaire;
            TypeMouvement1 = typeMouvement1;
        }

        public MouvementBancaire()
        {
        }

        public MouvementBancaire(int id)
        {
            Id = id;
        }
    }
}
