package com.example.parienligne.models;

public class ClientResponse {
    private String id;
    private String name;
    private boolean auth;
    private String token;


    public ClientResponse(String id, String name, boolean auth, String token) {
        this.id = id;
        this.name = name;
        this.auth = auth;
        this.token = token;
    }

    public ClientResponse(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isAuth() {
        return auth;
    }

    public void setAuth(boolean auth) {
        this.auth = auth;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "ClientResponse{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", auth=" + auth +
                ", token='" + token + '\'' +
                '}';
    }

    public ClientResponse(boolean auth, String token) {
        this.auth = auth;
        this.token = token;
    }
}
