package com.example.parienligne.models;

import java.util.List;

public class ItemCategorie {
    private String nomCategorie;
    private List<ChampCategorieSubItem> subChampCategorieSubItem;
    private String equipes;

    public String getEquipes() {
        return equipes;
    }

    public void setEquipes(String equipes) {
        this.equipes = equipes;
    }

    public String getNomCategorie() {
        return nomCategorie;
    }

    public void setNomCategorie(String nomCategorie) {
        this.nomCategorie = nomCategorie;
    }

    public List<ChampCategorieSubItem> getSubChampCategorie() {
        return subChampCategorieSubItem;
    }

    public void setSubChampCategorie(List<ChampCategorieSubItem> subChampCategorieSubItem) {
        this.subChampCategorieSubItem = subChampCategorieSubItem;
    }

    public ItemCategorie(String nomCategorie, List<ChampCategorieSubItem> subChampCategorieSubItem, String equipes) {
        this.nomCategorie = nomCategorie;
        this.subChampCategorieSubItem = subChampCategorieSubItem;
        this.equipes = equipes;
    }

    @Override
    public String toString() {
        return "ItemCategorie{" +
                "nomCategorie='" + nomCategorie + '\'' +
                ", subChampCategorieSubItem=" + subChampCategorieSubItem +
                ", equipes='" + equipes + '\'' +
                '}';
    }
}
