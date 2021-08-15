package com.example.parienligne.models;

import java.util.List;

public class PariAllInfo {
    private List<Doc_pari_all_info> docs;
    private int totalDocs;
    private int limit;
    private int page;
    private int totalPages;
    private int paggingCounter;
    private boolean hasPrevPage;
    private boolean hasNextPage;
    private boolean prevPage;
    private boolean nextPage;


    public PariAllInfo(List<Doc_pari_all_info> docs, int totalDocs, int limit, int page, int totalPages, int paggingCounter, boolean hasPrevPage, boolean hasNextPage, boolean prevPage, boolean nextPage) {
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

    public PariAllInfo() {
    }

    public List<Doc_pari_all_info> getDocs() {
        return docs;
    }

    public void setDocs(List<Doc_pari_all_info> docs) {
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
}
