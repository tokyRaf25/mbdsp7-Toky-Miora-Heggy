package com.example.parienligne.models;

public class Historique {
    private String _id;
    private String idClient;
    private String champ;
    private String categorie;
    private PariSport.Doc_pari pariSport;
    private double cotes;
    private double mise;
    private double gain;
    private int status;
    private String dateDePari;
    private int __v;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getIdClient() {
        return idClient;
    }

    public void setIdClient(String idClient) {
        this.idClient = idClient;
    }

    public String getChamp() {
        return champ;
    }

    public void setChamp(String champ) {
        this.champ = champ;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public PariSport.Doc_pari getPariSport() {
        return pariSport;
    }

    public void setPariSport(PariSport.Doc_pari pariSport) {
        this.pariSport = pariSport;
    }

    public double getCotes() {
        return cotes;
    }

    public void setCotes(double cotes) {
        this.cotes = cotes;
    }

    public double getMise() {
        return mise;
    }

    public void setMise(double mise) {
        this.mise = mise;
    }

    public double getGain() {
        return gain;
    }

    public void setGain(double gain) {
        this.gain = gain;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getDateDePari() {
        return dateDePari;
    }

    public void setDateDePari(String dateDePari) {
        this.dateDePari = dateDePari;
    }

    public int get__v() {
        return __v;
    }

    public void set__v(int __v) {
        this.__v = __v;
    }

    public Historique(String _id, String idClient, String champ, String categorie, PariSport.Doc_pari pariSport, double cotes, double mise, double gain, int status, String dateDePari, int __v) {
        this._id = _id;
        this.idClient = idClient;
        this.champ = champ;
        this.categorie = categorie;
        this.pariSport = pariSport;
        this.cotes = cotes;
        this.mise = mise;
        this.gain = gain;
        this.status = status;
        this.dateDePari = dateDePari;
        this.__v = __v;
    }
}
