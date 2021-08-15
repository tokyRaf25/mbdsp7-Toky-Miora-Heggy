package com.example.parienligne.models;

import java.util.List;

public class PariCategorieChamp {

    public class Doc_pari_categorie_champ {
        private String _id;
        private String nomcategorie;
        private String idTypePari;
        private int __v;
        private List<PariCategorieChamp.Champ> Champ;


        public List<PariCategorieChamp.Champ> getChamp() {
            return Champ;
        }

        public void setChamp(List<PariCategorieChamp.Champ> champ) {
            Champ = champ;
        }

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

        public Doc_pari_categorie_champ(String _id, String nomcategorie, String idTypePari, int __v, List<PariCategorieChamp.Champ> champ) {
            this._id = _id;
            this.nomcategorie = nomcategorie;
            this.idTypePari = idTypePari;
            this.__v = __v;
            Champ = champ;
        }

        public Doc_pari_categorie_champ() {
        }
    }

    public class Champ {
        private String _id;
        private String idCategorie;
        private String nomChamp;
        private int __v;

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

        public Champ(String _id, String idCategorie, String nomChamp, int __v) {
            this._id = _id;
            this.idCategorie = idCategorie;
            this.nomChamp = nomChamp;
            this.__v = __v;
        }

        public Champ() {
        }
    }

    private List<Doc_pari_categorie_champ> docs;
    private int totalDocs;
    private int limit;
    private int page;
    private int totalPages;
    private int paggingCounter;
    private boolean hasPrevPage;
    private boolean hasNextPage;
    private boolean prevPage;
    private boolean nextPage;


    public List<Doc_pari_categorie_champ> getDocs() {
        return docs;
    }

    public void setDocs(List<Doc_pari_categorie_champ> docs) {
        this.docs = docs;
    }

    public int getTotalDocs() {
        return totalDocs;
    }

    public void setTotalDocs(int totalDocs) {
        this.totalDocs = totalDocs;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public int getPaggingCounter() {
        return paggingCounter;
    }

    public void setPaggingCounter(int paggingCounter) {
        this.paggingCounter = paggingCounter;
    }

    public boolean isHasPrevPage() {
        return hasPrevPage;
    }

    public void setHasPrevPage(boolean hasPrevPage) {
        this.hasPrevPage = hasPrevPage;
    }

    public boolean isHasNextPage() {
        return hasNextPage;
    }

    public void setHasNextPage(boolean hasNextPage) {
        this.hasNextPage = hasNextPage;
    }

    public boolean isPrevPage() {
        return prevPage;
    }

    public void setPrevPage(boolean prevPage) {
        this.prevPage = prevPage;
    }

    public boolean isNextPage() {
        return nextPage;
    }

    public void setNextPage(boolean nextPage) {
        this.nextPage = nextPage;
    }

    public PariCategorieChamp(List<Doc_pari_categorie_champ> docs, int totalDocs, int limit, int page, int totalPages, int paggingCounter, boolean hasPrevPage, boolean hasNextPage, boolean prevPage, boolean nextPage) {
        this.docs = docs;
        this.totalDocs = totalDocs;
        this.limit = limit;
        this.page = page;
        this.totalPages = totalPages;
        this.paggingCounter = paggingCounter;
        this.hasPrevPage = hasPrevPage;
        this.hasNextPage = hasNextPage;
        this.prevPage = prevPage;
        this.nextPage = nextPage;
    }

    public PariCategorieChamp() {
    }
}
