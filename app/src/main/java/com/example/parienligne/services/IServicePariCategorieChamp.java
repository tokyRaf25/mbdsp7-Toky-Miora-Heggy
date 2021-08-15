package com.example.parienligne.services;

import com.example.parienligne.models.Categorie;
import com.example.parienligne.models.PariCategorieChamp;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface IServicePariCategorieChamp {

    @GET("api/categorie/{id}")
    Call<PariCategorieChamp> getAllData(@Path("id") String idTypePari);

}
