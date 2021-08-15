package com.example.parienligne.models;

public class InfoClient {
    private String _id;
    private String name;
    private String email;
    private double jetons;
    private String password;
    private int __v;


    public InfoClient(String _id, String name, String email, double jetons, String password, int __v) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.jetons = jetons;
        this.password = password;
        this.__v = __v;
    }


    public InfoClient() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getJetons() {
        return jetons;
    }

    public void setJetons(double jetons) {
        this.jetons = jetons;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int get__v() {
        return __v;
    }

    public void set__v(int __v) {
        this.__v = __v;
    }
}
