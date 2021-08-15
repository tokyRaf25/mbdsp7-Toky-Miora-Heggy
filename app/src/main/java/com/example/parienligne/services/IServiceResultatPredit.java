package com.example.parienligne.services;

import com.example.parienligne.models.ClientRequest;
import com.example.parienligne.models.ClientResponse;
import com.example.parienligne.models.Doc_Resultats_predits;
import com.example.parienligne.models.Historique;
import com.example.parienligne.models.PariSport;
import com.example.parienligne.models.PariSportDoc;
import com.example.parienligne.models.ResponsePost;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface IServiceResultatPredit {

    @POST("api/resultats_predit")
    Call<ResponsePost> postResultatPredit(@Body Doc_Resultats_predits resultats_predits);

    @GET("api/resultats_predit/user_en_cours/{userId}")
    Call<List<PariSportDoc>> getPariUserEnCours(@Path("userId") String idUser);

    @GET("api/resultats_predit/user_termine/{userId}")
    Call<List<PariSportDoc>> getPariUserTermine(@Path("userId") String idUser);

    @GET("api/resultats_predit/pariSport/{idPariSport}/{userId}")
    Call<List<Historique>> getPariSportUser(@Path("idPariSport") String idPariSport, @Path("userId") String userId);
}
