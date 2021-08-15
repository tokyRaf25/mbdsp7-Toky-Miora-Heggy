package com.example.parienligne.services;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {

    private static Retrofit retrofit;
    //private static String BASE_URL = "http://192.168.88.21:4000/";
    private static String BASE_URL = "https://apinodeapp.herokuapp.com/";
    //private static String BASE_URL = "http://10.200.222.185:4000/";

    public static Retrofit getRetrofitInstance() {
        if(retrofit == null){
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }
}
