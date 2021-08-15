package com.example.parienligne.models;

import java.util.List;

public class Doc_Resultats_predits {
    private String _id;
    private String idClient;
    private String idChamp;
    private String idPariSport;
    private double cotes;
    private double mise;
    private double gain;
    private int status;
    private String dateDePari;
    private double miseTotal;

    public double getMiseTotal() {
        return miseTotal;
    }

    public void setMiseTotal(double miseTotal) {
        this.miseTotal = miseTotal;
    }

    public Doc_Resultats_predits(String _id, String idClient, String idChamp, String idPariSport, double cotes, double mise, double gain, int status, String dateDePari, double miseTotal) {
        this._id = _id;
        this.idClient = idClient;
        this.idChamp = idChamp;
        this.idPariSport = idPariSport;
        this.cotes = cotes;
        this.mise = mise;
        this.gain = gain;
        this.status = status;
        this.dateDePari = dateDePari;
        this.miseTotal = miseTotal;
    }

    public Doc_Resultats_predits(String idClient, String idChamp, String idPariSport, double cotes, double mise, double gain, int status, String dateDePari, double miseTotal) {
        this.idClient = idClient;
        this.idChamp = idChamp;
        this.idPariSport = idPariSport;
        this.cotes = cotes;
        this.mise = mise;
        this.gain = gain;
        this.status = status;
        this.dateDePari = dateDePari;
        this.miseTotal = miseTotal;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public Doc_Resultats_predits() {
    }

    public String getIdClient() {
        return idClient;
    }

    public void setIdClient(String idClient) {
        this.idClient = idClient;
    }

    public String getIdChamp() {
        return idChamp;
    }

    public void setIdChamp(String idChamp) {
        this.idChamp = idChamp;
    }

    public String getIdPariSport() {
        return idPariSport;
    }

    public void setIdPariSport(String idPariSport) {
        this.idPariSport = idPariSport;
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
}
