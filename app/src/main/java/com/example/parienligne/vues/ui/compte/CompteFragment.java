package com.example.parienligne.vues.ui.compte;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.example.parienligne.R;
import com.example.parienligne.databinding.FragmentCompteBinding;
import com.example.parienligne.models.InfoClient;
import com.example.parienligne.models.PariAllInfo;
import com.example.parienligne.outils.SessionSharedPreferences;
import com.example.parienligne.services.IServiceClient;
import com.example.parienligne.services.IServicePariSport;
import com.example.parienligne.services.RetrofitClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class CompteFragment extends Fragment {

    private CompteViewModel compteViewModel;
    private FragmentCompteBinding binding;
    private TextView txt_username;
    private TextView txt_email;
    private TextView txt_jetons;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        compteViewModel =
                new ViewModelProvider(this).get(CompteViewModel.class);

        binding = FragmentCompteBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        onInit(root);

        return root;
    }

    private void onInit(View root) {
        txt_username = root.findViewById(R.id.txt_username);
        txt_email = root.findViewById(R.id.txt_email);
        txt_jetons = root.findViewById(R.id.txt_jetons);
        callWS(root);
    }

    private void callWS(View root) {
        IServiceClient serviceClient = RetrofitClient.getRetrofitInstance().create(IServiceClient.class);
        Call<InfoClient> infoClientCall = serviceClient.getClientById(SessionSharedPreferences.getIdClient(getActivity()));
        infoClientCall.enqueue(new Callback<InfoClient>() {
            @Override
            public void onResponse(Call<InfoClient> call, Response<InfoClient> response) {
                InfoClient client = response.body();
                txt_username.setText(client.getName());
                txt_email.setText(client.getEmail());
                txt_jetons.setText(client.getJetons()+"");
            }

            @Override
            public void onFailure(Call<InfoClient> call, Throwable t) {

            }
        });
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}