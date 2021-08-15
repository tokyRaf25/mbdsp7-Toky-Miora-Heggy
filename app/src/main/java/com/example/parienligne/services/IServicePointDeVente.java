package com.example.parienligne.services;

import com.example.parienligne.models.PariSport;
import com.example.parienligne.models.PointDeVente;

import retrofit2.Call;
import retrofit2.http.GET;

public interface IServicePointDeVente {
    @GET("/api/point_de_vente")
    Call<PointDeVente> getAllData();
}
