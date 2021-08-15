package com.example.parienligne.services;

import com.example.parienligne.models.Categorie;

import retrofit2.Call;
import retrofit2.http.GET;


public interface IServiceCategorie {

    @GET("/categorie")
    Call<Categorie> getAllData();
}
