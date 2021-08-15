package com.example.parienligne.models;

import java.util.List;

public class PariSportDoc {
    private String _id;
    private List<Equipe> equipes;
    private String idTypePari;
    private String dateDuMatch;
    private String autres_info;
    private int __v;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
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

    public List<Equipe> getEquipes() {
        return equipes;
    }

    public void setEquipes(List<Equipe> equipes) {
        this.equipes = equipes;
    }

    public int get__v() {
        return __v;
    }

    public void set__v(int __v) {
        this.__v = __v;
    }

    public PariSportDoc(String _id, List<Equipe> equipes, String idTypePari, String dateDuMatch, String autres_info, int __v ) {
        this._id = _id;
        this.idTypePari = idTypePari;
        this.dateDuMatch = dateDuMatch;
        this.autres_info = autres_info;
        this.equipes = equipes;
        this.__v = __v;
    }

    public PariSportDoc(String _id) {
        this._id = _id;
    }

    public PariSportDoc() {
    }
}
