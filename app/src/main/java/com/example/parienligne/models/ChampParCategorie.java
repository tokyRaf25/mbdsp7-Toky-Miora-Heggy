package com.example.parienligne.models;

public class ChampParCategorie {
    private String _id;
    private String nomChamp;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getNomChamp() {
        return nomChamp;
    }

    public void setNomChamp(String nomChamp) {
        this.nomChamp = nomChamp;
    }

    public ChampParCategorie(String _id, String nomChamp) {
        this._id = _id;
        this.nomChamp = nomChamp;
    }

    public ChampParCategorie(){

    }

    public ChampParCategorie(String _id){
        this._id = _id;
    }
}
