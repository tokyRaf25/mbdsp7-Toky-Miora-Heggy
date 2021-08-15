package com.example.parienligne.models;

public class Equipe {
    private String _id;
    private String nomEquipe;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getNomEquipe() {
        return nomEquipe;
    }

    public void setNomEquipe(String nomEquipe) {
        this.nomEquipe = nomEquipe;
    }

    public Equipe(String _id, String nomEquipe) {
        this._id = _id;
        this.nomEquipe = nomEquipe;
    }

    public Equipe(){}

    public Equipe(String _id) {
        this._id = _id;
    }
}
