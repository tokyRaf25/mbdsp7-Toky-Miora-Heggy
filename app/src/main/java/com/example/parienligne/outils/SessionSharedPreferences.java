package com.example.parienligne.outils;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.Configuration;

import com.example.parienligne.models.ClientResponse;

import java.util.Locale;

public class SessionSharedPreferences {

    public static void saveUser(Activity activity, String id, String username, Boolean auth, String token) {
        SharedPreferences sharedPref = activity.getSharedPreferences("UserSettings", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString("id", id);
        editor.putString("username", username);
        editor.putBoolean("auth", auth);
        editor.putString("token", token);
        editor.apply();
    }

    public static ClientResponse readUserSaved(Activity activity) {
        SharedPreferences sharedPref = activity.getSharedPreferences("UserSettings", Context.MODE_PRIVATE);
        String id = sharedPref.getString("id", "");
        String name = sharedPref.getString("username", "");
        Boolean auth = sharedPref.getBoolean("auth", false);
        String token = sharedPref.getString("token", "");
        return new ClientResponse(id,name,auth,token);
    }

    public static boolean isTokenExist(Activity activity){
        SharedPreferences sharedPref = activity.getSharedPreferences("UserSettings", Context.MODE_PRIVATE);
        return sharedPref.contains("token") && sharedPref.contains("auth");
    }

    public static String getIdClient(Activity activity){
        SharedPreferences sharedPref = activity.getSharedPreferences("UserSettings", Context.MODE_PRIVATE);
        return sharedPref.getString("id", "");
    }

    public static void destroySharedPreferences(Activity activity){
        SharedPreferences sharedPref = activity.getSharedPreferences("UserSettings", Context.MODE_PRIVATE);
        sharedPref.edit().clear().apply();
    }
}
