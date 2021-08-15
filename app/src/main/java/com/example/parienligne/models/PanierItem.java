package com.example.parienligne.models;

public class PanierItem {
    private String id_champ;
    private double cote;
    private String equipe;
    private String categorie;
    private String champ;
    private double mise;

    public double getMise() {
        return mise;
    }

    public void setMise(double mise) {
        this.mise = mise;
    }

    public String getId_champ() {
        return id_champ;
    }

    public void setId_champ(String id_champ) {
        this.id_champ = id_champ;
    }

    public double getCote() {
        return cote;
    }

    public void setCote(double cote) {
        this.cote = cote;
    }

    public String getEquipe() {
        return equipe;
    }

    public void setEquipe(String equipe) {
        this.equipe = equipe;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getChamp() {
        return champ;
    }

    public void setChamp(String champ) {
        this.champ = champ;
    }

    public PanierItem(String id_champ, double cote, String equipe, String categorie, String champ) {
        this.id_champ = id_champ;
        this.cote = cote;
        this.equipe = equipe;
        this.categorie = categorie;
        this.champ = champ;
    }

    public PanierItem() {
    }
}
