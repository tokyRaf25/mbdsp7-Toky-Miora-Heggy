package com.example.parienligne.models;

public class ChampCategorieSubItem {
    private String id;
    private String subItemNomChamp;
    private String subItemCote;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSubItemNomChamp() {
        return subItemNomChamp;
    }

    public void setSubItemNomChamp(String subItemNomChamp) {
        this.subItemNomChamp = subItemNomChamp;
    }

    public String getSubItemCote() {
        return subItemCote;
    }

    public void setSubItemCote(String subItemCote) {
        this.subItemCote = subItemCote;
    }

    public ChampCategorieSubItem( String id, String subItemNomChamp, String subItemCote) {
        this.subItemNomChamp = subItemNomChamp;
        this.subItemCote = subItemCote;
        this.id = id;
    }
}
