package com.example.parienligne.models;

public class Cote {
    private String __id;
    private String idParieSport;
    private String idChamp;
    private double cotes;
    private int __v;

    public String get__id() {
        return __id;
    }

    public void set__id(String __id) {
        this.__id = __id;
    }

    public String getIdParieSport() {
        return idParieSport;
    }

    public void setIdParieSport(String idParieSport) {
        this.idParieSport = idParieSport;
    }

    public String getIdChamp() {
        return idChamp;
    }

    public void setIdChamp(String idChamp) {
        this.idChamp = idChamp;
    }

    public double getCotes() {
        return cotes;
    }

    public void setCotes(double cotes) {
        this.cotes = cotes;
    }

    public int get__v() {
        return __v;
    }

    public void set__v(int __v) {
        this.__v = __v;
    }

    public Cote(String __id, String idParieSport, String idChamp, double cotes, int __v) {
        this.__id = __id;
        this.idParieSport = idParieSport;
        this.idChamp = idChamp;
        this.cotes = cotes;
        this.__v = __v;
    }

    public Cote() {
    }
}
