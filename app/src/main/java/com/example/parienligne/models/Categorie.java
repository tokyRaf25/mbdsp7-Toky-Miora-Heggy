package com.example.parienligne.models;

import java.util.List;

public class Categorie {


    public class Doc_cat {
        private String _id;
        private String nomcategorie;
        private String idTypeParis;
        private int __v;

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

        public String getIdTypeParis() {
            return idTypeParis;
        }

        public void setIdTypeParis(String idTypeParis) {
            this.idTypeParis = idTypeParis;
        }

        public int get__v() {
            return __v;
        }

        public void set__v(int __v) {
            this.__v = __v;
        }

        public Doc_cat(String _id, String nomcategorie, String idTypeParis, int __v) {
            this._id = _id;
            this.nomcategorie = nomcategorie;
            this.idTypeParis = idTypeParis;
            this.__v = __v;
        }
        public Doc_cat(){}
    }

    private List<Doc_cat> docs;
    private int totalDocs;
    private int limit;
    private int page;
    private int totalPages;
    private int paggingCounter;
    private boolean hasPrevPage;
    private boolean hasNextPage;
    private boolean prevPage;
    private boolean nextPage;

    public Categorie(){

    }

    public List<Doc_cat> getDocs() {
        return docs;
    }

    public void setDocs(List<Doc_cat> docs) {
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

    public Categorie(List<Doc_cat> docs, int totalDocs, int limit, int page, int totalPages, int paggingCounter, boolean hasPrevPage, boolean hasNextPage, boolean prevPage, boolean nextPage) {
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
}
