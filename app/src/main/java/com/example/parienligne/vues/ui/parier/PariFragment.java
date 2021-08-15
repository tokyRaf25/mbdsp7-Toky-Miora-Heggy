package com.example.parienligne.vues.ui.parier;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.parienligne.R;
import com.example.parienligne.databinding.FragmentPariBinding;
import com.example.parienligne.models.ChampCategorieSubItem;
import com.example.parienligne.models.Doc_pari_all_info;
import com.example.parienligne.models.ItemCategorie;
import com.example.parienligne.models.PariAllInfo;
import com.example.parienligne.outils.LoadingDialog;
import com.example.parienligne.services.IServicePariSport;
import com.example.parienligne.services.RetrofitClient;
import com.example.parienligne.vues.LoginActivity;
import com.example.parienligne.vues.adapter.CategorieItemAdapter;
import com.google.zxing.common.StringUtils;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PariFragment extends Fragment{

    private PariViewModel pariViewModel;
    private FragmentPariBinding binding;
    ListView listView;
    private String idPari;
    private static final String TAG = "AccueilActivity";
    private Button placer_pari;
    LoadingDialog loadingDialog;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        pariViewModel =
                new ViewModelProvider(this).get(PariViewModel.class);

        binding = FragmentPariBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        RecyclerView rvItem = root.findViewById(R.id.listview_cat);
        LinearLayoutManager layoutManager = new LinearLayoutManager(getActivity());
        onInit(rvItem, layoutManager,root);
        return root;
    }

    public void onInit(RecyclerView rvItem, LinearLayoutManager layoutManager, View root){
        loadingDialog = new LoadingDialog(getActivity());
        placer_pari = root.findViewById(R.id.btn_placer_pari);
        callWS(rvItem, layoutManager, root);
        placer_pari();

    }

    private void placer_pari(){
        placer_pari.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(getActivity().getApplicationContext(),"***** placer paris", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void callWS(RecyclerView rvItem, LinearLayoutManager layoutManager, View root) {
        loadingDialog.startingLoadingDialog();
        if(getArguments() != null){
            PariFragmentArgs args = PariFragmentArgs.fromBundle(getArguments());
            idPari = args.getIdParis();
        }
        Log.e(TAG, "******idPari: "+idPari);
        IServicePariSport servicePariSport = RetrofitClient.getRetrofitInstance().create(IServicePariSport.class);
        Call<PariAllInfo> servicePariSportCall = servicePariSport.getAllDataPariWithCote(idPari);
        servicePariSportCall.enqueue(new Callback<PariAllInfo>() {
            @Override
            public void onResponse(Call<PariAllInfo> call, Response<PariAllInfo> response) {
                if(response.body().getDocs().size() == 0){
                    showToast("Les données pour le paris n'existent pas encode");
                    Navigation.findNavController(root).navigate(R.id.nav_home);
                }
                else{
                    Doc_pari_all_info pari = response.body().getDocs().get(0);
                    List<ItemCategorie> itemList = new ArrayList();
                    String equipes = pari.getEquipes().get(0).getNomEquipe().toUpperCase() + " - "+pari.getEquipes().get(1).getNomEquipe().toUpperCase();
                    for(Doc_pari_all_info.Categorie_champ p : pari.getCategorie()){
                        List<ChampCategorieSubItem> subItemList = new ArrayList<>();
                        for(Doc_pari_all_info.Champ champ : p.getChamp()){
                            subItemList.add(new ChampCategorieSubItem(champ.get_id(),champ.getNomChamp(),champ.getCote().get(0).getCotes()+"" ));
                        }
                        itemList.add(new ItemCategorie(p.getNomcategorie(),subItemList,equipes));
                    }

                    CategorieItemAdapter itemAdapter = new CategorieItemAdapter(getContext(),root,itemList,idPari);

                    //teo aloha
                    rvItem.setAdapter(itemAdapter);
                    rvItem.setLayoutManager(layoutManager);
                    loadingDialog.dismissDialog();
                }


            }
            @Override
            public void onFailure(Call<PariAllInfo> call, Throwable t) {

            }
        });
    }

    private void showToast(String message){
        Toast.makeText(getActivity().getApplicationContext(),message, Toast.LENGTH_LONG).show();

    }

    @Override
    public void onViewCreated(@NonNull @NotNull View view, @Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}