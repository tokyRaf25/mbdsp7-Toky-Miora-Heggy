package com.example.parienligne.vues.ui.home;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;

import com.example.parienligne.R;
import com.example.parienligne.databinding.FragmentHomeBinding;
import com.example.parienligne.models.Categorie;
import com.example.parienligne.models.PariSport;
import com.example.parienligne.outils.LoadingDialog;
import com.example.parienligne.outils.SessionSharedPreferences;
import com.example.parienligne.services.IServiceCategorie;
import com.example.parienligne.services.IServicePariSport;
import com.example.parienligne.services.RetrofitClient;
import com.example.parienligne.vues.ui.parier.PariFragment;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class HomeFragment extends Fragment {

    private static final String TAG = "AccueilActivity";
    ListView listView;
    private HomeViewModel homeViewModel;
    private FragmentHomeBinding binding;
    LoadingDialog loadingDialog;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        homeViewModel =
                new ViewModelProvider(this).get(HomeViewModel.class);

        init();

        binding = FragmentHomeBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        loadingDialog.startingLoadingDialog();
        IServicePariSport IServicePariSport = RetrofitClient.getRetrofitInstance().create(IServicePariSport.class);
        Call<PariSport> pariSports = IServicePariSport.getAllData(SessionSharedPreferences.getIdClient(getActivity()));
        pariSports.enqueue(new Callback<PariSport>() {
            @Override
            public void onResponse(Call<PariSport> call, Response<PariSport> response) {
                Log.e(TAG, "onResponse: code : "+response.code());
                List<PariSport.Doc_pari> liste = response.body().getDocs();
                listView = root.findViewById(R.id.listView);
                MyAdapter adapter = new MyAdapter(getActivity(), liste);
                listView.setAdapter(adapter);
                listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                        //HomeFragmentDirection.
                        HomeFragmentDirections.ActionNavHomeToNavPari action = HomeFragmentDirections.actionNavHomeToNavPari();
                        action.setMessage("Bonjour");
                        action.setIdParis(liste.get(i).get_id());
                        //Navigation.findNavController(view).navigate(R.id.nav_pari);
                        Navigation.findNavController(view).navigate(action);
                    }
                });
                loadingDialog.dismissDialog();
            }
            @Override
            public void onFailure(Call<PariSport> call, Throwable t) {
                Log.e(TAG, "onFailure: "+t.getMessage());
            }
        });


        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    private void init(){
        loadingDialog = new LoadingDialog(getActivity());
    }


    class MyAdapter extends ArrayAdapter<PariSport.Doc_pari> {

        Context context;
        List<PariSport.Doc_pari> pariSport;

        MyAdapter(Context c, List<PariSport.Doc_pari> pariSport) {
            super(c, R.layout.row, pariSport);
            this.context = c;
            this.pariSport = pariSport;

        }

        @NonNull
        @Override
        public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
            LayoutInflater layoutInflater = (LayoutInflater) getActivity().getApplicationContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            View row = layoutInflater.inflate(R.layout.row, parent, false);
            ImageView images = row.findViewById(R.id.img_illustration);
            TextView autresInfo = row.findViewById(R.id.txt_description);
            TextView equipes = row.findViewById(R.id.txt_equipe);
            TextView dateDuMatch = row.findViewById(R.id.txt_dateDuMatch);
            PariSport.Doc_pari pari = pariSport.get(position);
            autresInfo.setText(pari.getAutres_info());
            equipes.setText(pari.getEquipes().get(0).getNomEquipe()+" - "+pari.getEquipes().get(1).getNomEquipe());
            dateDuMatch.setText(pari.getDateDuMatch().toString());
            if(pari.getIdTypePari().equals("60b91a09bb33a3e0bd749715")){
                images.setImageResource(R.drawable.footballicon);
            }else if(pari.getIdTypePari().equals("60c9ee674a243561604bd63e")){
                images.setImageResource(R.drawable.tennisicon);
            }
            return row;
        }
    }
}