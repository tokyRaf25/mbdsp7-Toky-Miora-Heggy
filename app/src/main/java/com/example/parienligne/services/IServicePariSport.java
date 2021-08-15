package com.example.parienligne.services;

import com.example.parienligne.models.PariAllInfo;
import com.example.parienligne.models.PariCategorieChamp;
import com.example.parienligne.models.PariSport;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface IServicePariSport {

    @GET("/api/pariValide/{userId}")
    Call<PariSport> getAllData(@Path("userId") String userId);

    @GET("api/pariAvecCote/{id}")
    Call<PariAllInfo> getAllDataPariWithCote(@Path("id") String idTypePari);
}
