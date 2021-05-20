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
            DEBIT,CREDIT
        }

        private int id;
        private DateTime dateMouvement;
        private TypeMouvement typeMouvement;
        private double somme;

        public int Id { get => id; set => id = value; }
        public DateTime DateMouvement { get => dateMouvement; set => dateMouvement = value; }
        public double Somme { get => somme; set => somme = value; }
        public TypeMouvement TypeMouvement1 { get => typeMouvement; set => typeMouvement = value; }

        public MouvementBancaire(int id, DateTime dateMouvement, double somme, TypeMouvement typeMouvement1)
        {
            Id = id;
            DateMouvement = dateMouvement;
            Somme = somme;
            TypeMouvement1 = typeMouvement1;
        }

        public MouvementBancaire(DateTime dateMouvement, double somme, TypeMouvement typeMouvement1)
        {
            DateMouvement = dateMouvement;
            Somme = somme;
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
