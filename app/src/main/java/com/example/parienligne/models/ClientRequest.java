package com.example.parienligne.models;

public class ClientRequest {
    private String name;
    private String password;

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

    public ClientRequest(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public ClientRequest(){}

    @Override
    public String toString() {
        return "ClientRequest{" +
                "name='" + name + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
