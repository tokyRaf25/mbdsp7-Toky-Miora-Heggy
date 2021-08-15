package com.example.parienligne.models;

import java.util.List;

public class Doc_pari_all_info {
    private String _id;
    private List<Equipe> equipes;
    private String idTypePari;
    private String dateDuMatch;
    private String autres_info;
    private int __v;
    private List<Categorie_champ> Categorie;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public List<Equipe> getEquipes() {
        return equipes;
    }

    public void setEquipes(List<Equipe> equipes) {
        this.equipes = equipes;
    }

    public String getIdTypePari() {
        return idTypePari;
    }

    public void setIdTypePari(String idTypePari) {
        this.idTypePari = idTypePari;
    }

    public String getDateDuMatch() {
        return dateDuMatch;
    }

    public void setDateDuMatch(String dateDuMatch) {
        this.dateDuMatch = dateDuMatch;
    }

    public String getAutres_info() {
        return autres_info;
    }

    public void setAutres_info(String autres_info) {
        this.autres_info = autres_info;
    }

    public int get__v() {
        return __v;
    }

    public void set__v(int __v) {
        this.__v = __v;
    }

    public List<Categorie_champ> getCategorie() {
        return Categorie;
    }

    public void setCategorie(List<Categorie_champ> categorie) {
        Categorie = categorie;
    }


    public Doc_pari_all_info(String _id, List<Equipe> equipes, String idTypePari, String dateDuMatch, String autres_info, int __v, List<Categorie_champ> categorie) {
        this._id = _id;
        this.equipes = equipes;
        this.idTypePari = idTypePari;
        this.dateDuMatch = dateDuMatch;
        this.autres_info = autres_info;
        this.__v = __v;
        Categorie = categorie;
    }

    public Doc_pari_all_info() {
    }

    public class Categorie_champ{
        private String _id;
        private String nomcategorie;
        private String idTypePari;
        private int __v;
        private List<Champ> champ;

        public String get_id() {
            return _id;
        }

        public void set_id(String _id) {
            this._id = _id;
        }

        public String getNomcategorie() {
            return nomcategorie;
        }

        public void setNomcategorie(String nomcategorie) {
            this.nomcategorie = nomcategorie;
        }

        public String getIdTypePari() {
            return idTypePari;
        }

        public void setIdTypePari(String idTypePari) {
            this.idTypePari = idTypePari;
        }

        public int get__v() {
            return __v;
        }

        public void set__v(int __v) {
            this.__v = __v;
        }

        public List<Champ> getChamp() {
            return champ;
        }

        public void setChamp(List<Champ> champ) {
            this.champ = champ;
        }

        public Categorie_champ(String _id, String nomcategorie, String idTypePari, int __v, List<Champ> champ) {
            this._id = _id;
            this.nomcategorie = nomcategorie;
            this.idTypePari = idTypePari;
            this.__v = __v;
            this.champ = champ;
        }

        public Categorie_champ() {
        }
    }

    public class Champ{
        private String _id;
        private String idCategorie;
        private String nomChamp;
        private int __v;
        private List<Cote> cote;

        public Champ(String _id, String idCategorie, String nomChamp, int __v, List<Cote> cote) {
            this._id = _id;
            this.idCategorie = idCategorie;
            this.nomChamp = nomChamp;
            this.__v = __v;
            this.cote = cote;
        }

        public Champ() {
        }

        public String get_id() {
            return _id;
        }

        public void set_id(String _id) {
            this._id = _id;
        }

        public String getIdCategorie() {
            return idCategorie;
        }

        public void setIdCategorie(String idCategorie) {
            this.idCategorie = idCategorie;
        }

        public String getNomChamp() {
            return nomChamp;
        }

        public void setNomChamp(String nomChamp) {
            this.nomChamp = nomChamp;
        }

        public int get__v() {
            return __v;
        }

        public void set__v(int __v) {
            this.__v = __v;
        }

        public List<Cote> getCote() {
            return cote;
        }

        public void setCote(List<Cote> cote) {
            this.cote = cote;
        }
    }

}
