package com.example.parienligne.vues;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.text.method.LinkMovementMethod;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.parienligne.R;
import com.example.parienligne.models.ClientRequest;
import com.example.parienligne.models.ClientResponse;
import com.example.parienligne.models.UserQrCode;
import com.example.parienligne.outils.LoadingDialog;
import com.example.parienligne.outils.SessionSharedPreferences;
import com.example.parienligne.services.IServiceClient;
import com.example.parienligne.services.RetrofitClient;
import com.google.gson.Gson;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {


    private Button btnLogin;
    private Button btnCreateAccount;
    private Button btnQrcode;
    private EditText email;
    private EditText password;
    LoadingDialog loadingDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        userVerificationIfAuth();
        init();
    }

    private void userVerificationIfAuth(){
        AlertDialog.Builder builder1 = new AlertDialog.Builder(this);
        builder1.setMessage("Vous vous êtes déja connecté à un compte voulez vous continuer?");
        builder1.setCancelable(true);
        builder1.setPositiveButton(
                "Oui",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        Intent intent = new Intent(LoginActivity.this,AccueilActivity.class);
                        startActivity(intent);
                    }
                });

        builder1.setNegativeButton(
                "Non",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.cancel();
                    }
                });
        if(SessionSharedPreferences.isTokenExist(this)){
            AlertDialog alert11 = builder1.create();
            alert11.show();
        }
    }

    private void init(){
        btnLogin = findViewById(R.id.buttonLogin);
        btnCreateAccount = findViewById(R.id.buttonCreateAccount);
        btnQrcode = findViewById(R.id.button_qrcode);
        email = findViewById(R.id.inputEmail);
        password = findViewById(R.id.inputPassword);
        runLogin();
        runCreateAccount();
        runQrCode();
        loadingDialog = new LoadingDialog(LoginActivity.this);
        setupHyperlink();
    }

    private void setupHyperlink() {
        TextView linkTextView = findViewById(R.id.txt_inscription);
        linkTextView.setMovementMethod(LinkMovementMethod.getInstance());
        linkTextView.setLinkTextColor(Color.BLUE);
    }

    private void runQrCode() {
        findViewById(R.id.button_qrcode).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LoginActivity.this,ScannerActivity.class);
                startActivity(intent);
            }
        });
    }

    private void runCreateAccount(){
        findViewById(R.id.buttonCreateAccount).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LoginActivity.this,MapsFragment.class);
                startActivity(intent);
            }
        });
    }

    private void runLogin() {
        AlertDialog.Builder dlgAlert  = new AlertDialog.Builder(this);
        //Log.e("LoginActivity", "**tafiditra ato ilay izy!");
        findViewById(R.id.buttonLogin).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loadingDialog.startingLoadingDialog();
                IServiceClient service = RetrofitClient.getRetrofitInstance().create(IServiceClient.class);
                Call<ClientResponse> response = service.postLogin(new ClientRequest(email.getText().toString(),password.getText().toString()));
                response.enqueue(new Callback<ClientResponse>() {
                    @Override
                    public void onResponse(Call<ClientResponse> call, Response<ClientResponse> response) {
                        //ClientResponse client = response.body();
                        if(response.code() == 200){
                            if(response.body().isAuth()){
                                SessionSharedPreferences.saveUser(LoginActivity.this,response.body().getId(),response.body().getName(), response.body().isAuth(), response.body().getToken());
                                Intent intent = new Intent(LoginActivity.this,AccueilActivity.class);
                                startActivity(intent);
                                loadingDialog.dismissDialog();
                            }else{
                                showToast("Erreur d'authentification");
                            }
                        }if (response.code() == 401 || response.code() == 404){
                            Log.e("LoginActivity", "tafiditra ato ilay izy!");
                            showToast("Erreur d'authentification");
                        }
                    }

                    @Override
                    public void onFailure(Call<ClientResponse> call, Throwable t) {

                    }
                });

            }
        });
    }


    private void showToast(String message){
        Toast.makeText(LoginActivity.this,message, Toast.LENGTH_LONG).show();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable @org.jetbrains.annotations.Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

    }



}