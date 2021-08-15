package com.example.parienligne.models;

import java.util.Date;
import java.util.List;

public class PariSport {

    public class Doc_pari {
        private String _id;
        private String idTypePari;
        private String dateDuMatch;
        private String autres_info;
        private List<Equipe> equipes;

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

        public Doc_pari(String _id, String idTypePari, String dateDuMatch, String autres_info, List<Equipe> equipes) {
            this._id = _id;
            this.idTypePari = idTypePari;
            this.dateDuMatch = dateDuMatch;
            this.autres_info = autres_info;
            this.equipes = equipes;
        }

        public Doc_pari(String _id) {
            this._id = _id;
        }

        public Doc_pari() {
        }
    }
    private List<Doc_pari> docs;
    private int totalDocs;
    private int limit;
    private int page;
    private int totalPages;
    private int paggingCounter;
    private boolean hasPrevPage;
    private boolean hasNextPage;
    private boolean prevPage;
    private boolean nextPage;

    public List<Doc_pari> getDocs() {
        return docs;
    }

    public void setDocs(List<Doc_pari> docs) {
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

    public PariSport(List<Doc_pari> docs, int totalDocs, int limit, int page, int totalPages, int paggingCounter, boolean hasPrevPage, boolean hasNextPage, boolean prevPage, boolean nextPage) {
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

    public PariSport() {
    }
}
