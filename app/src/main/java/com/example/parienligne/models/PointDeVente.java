package com.example.parienligne.models;

import java.util.List;

public class PointDeVente {

    public class Doc_point_de_dente{
        private String _id;
        private String nomDuLieu;
        private double latitude;
        private double longitude;

        public String get_id() {
            return _id;
        }

        public void set_id(String _id) {
            this._id = _id;
        }

        public String getNomDuLieu() {
            return nomDuLieu;
        }

        public void setNomDuLieu(String nomDuLieu) {
            this.nomDuLieu = nomDuLieu;
        }

        public double getLatitude() {
            return latitude;
        }

        public void setLatitue(double latitue) {
            this.latitude = latitue;
        }

        public double getLongitude() {
            return longitude;
        }

        public void setLongitude(double longitude) {
            this.longitude = longitude;
        }

        public Doc_point_de_dente(String _id, String nomDuLieu, double latitude, double longitude) {
            this._id = _id;
            this.nomDuLieu = nomDuLieu;
            this.latitude = latitude;
            this.longitude = longitude;
        }

        public Doc_point_de_dente() {
        }
    }
    private List<Doc_point_de_dente> docs;
    private int totalDocs;
    private int limit;
    private int page;
    private int totalPages;
    private int paggingCounter;
    private boolean hasPrevPage;
    private boolean hasNextPage;
    private boolean prevPage;
    private boolean nextPage;

    public List<Doc_point_de_dente> getDocs() {
        return docs;
    }

    public void setDocs(List<Doc_point_de_dente> docs) {
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

    public PointDeVente(List<Doc_point_de_dente> docs, int totalDocs, int limit, int page, int totalPages, int paggingCounter, boolean hasPrevPage, boolean hasNextPage, boolean prevPage, boolean nextPage) {
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

    public PointDeVente() {
    }
}
