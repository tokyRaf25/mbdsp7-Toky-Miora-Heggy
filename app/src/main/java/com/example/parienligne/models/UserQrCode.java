package com.example.parienligne.models;

public class UserQrCode {

    private String id;
    private String name;
    private String password;
    private boolean auth;
    private String token;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public UserQrCode(String id, String name, String password, boolean auth, String token) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.auth = auth;
        this.token = token;
    }
}
