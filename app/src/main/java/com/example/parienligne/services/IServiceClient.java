package com.example.parienligne.services;

import com.example.parienligne.models.Categorie;
import com.example.parienligne.models.ClientRequest;
import com.example.parienligne.models.ClientResponse;
import com.example.parienligne.models.InfoClient;
import com.example.parienligne.models.PariCategorieChamp;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface  IServiceClient {

    @POST("api/authentification")
    Call<ClientResponse> postLogin(@Body ClientRequest client);

    @GET("api/client/{id}")
    Call<InfoClient> getClientById(@Path("id") String idClient);
}
