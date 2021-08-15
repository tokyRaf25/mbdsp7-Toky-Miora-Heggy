package com.example.parienligne.vues.ui.mes_paris;

import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import com.example.parienligne.R;
import com.example.parienligne.databinding.FragmentMesParisBinding;
import com.example.parienligne.models.PariSport;
import com.example.parienligne.models.PariSportDoc;
import com.example.parienligne.outils.SessionSharedPreferences;
import com.example.parienligne.services.IServicePariSport;
import com.example.parienligne.services.IServiceResultatPredit;
import com.example.parienligne.services.RetrofitClient;
import com.example.parienligne.vues.ui.historique.HistoriqueViewModel;
import com.example.parienligne.vues.ui.home.HomeFragment;
import com.example.parienligne.vues.ui.home.HomeFragmentDirections;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MesParisFragment extends Fragment {

    private static final String TAG = "AccueilActivity";
    ListView listView;
    private MesParisViewModel mesParisViewModel;
    private FragmentMesParisBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        mesParisViewModel =
                new ViewModelProvider(this).get(MesParisViewModel.class);

        binding = FragmentMesParisBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        init();

        IServiceResultatPredit service = RetrofitClient.getRetrofitInstance().create(IServiceResultatPredit.class);
        Call<List<PariSportDoc>> pariSports = service.getPariUserEnCours(SessionSharedPreferences.getIdClient(getActivity()));
        pariSports.enqueue(new Callback<List<PariSportDoc>>() {
            @Override
            public void onResponse(Call<List<PariSportDoc>> call, Response<List<PariSportDoc>> response) {
                Log.e(TAG, "onResponse: code : "+response.code());
                List<PariSportDoc> liste = response.body();
                listView = root.findViewById(R.id.listView_pari_en_cours);
                MesParisFragment.MyAdapter1 adapter = new MesParisFragment.MyAdapter1(getActivity(), liste);
                listView.setAdapter(adapter);
                listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                        //HomeFragmentDirection.
                        MesParisFragmentDirections.ActionNavMesParisToNavHistorique action = MesParisFragmentDirections.actionNavMesParisToNavHistorique();
                        action.setIdParis(liste.get(i).get_id());
                        action.setStatus("en_cours");
                        //Navigation.findNavController(view).navigate(R.id.nav_pari);
                        Navigation.findNavController(view).navigate(action);
                    }
                });
            }
            @Override
            public void onFailure(Call<List<PariSportDoc>> call, Throwable t) {
                Log.e(TAG, "onFailureMesPariFragment: "+t.getMessage());
            }
        });

        Call<List<PariSportDoc>> pariSportsTermine = service.getPariUserTermine(SessionSharedPreferences.getIdClient(getActivity()));
        pariSportsTermine.enqueue(new Callback<List<PariSportDoc>>() {
            @Override
            public void onResponse(Call<List<PariSportDoc>> call, Response<List<PariSportDoc>> response) {
                Log.e(TAG, "onResponse: code : "+response.code());
                List<PariSportDoc> liste = response.body();
                listView = root.findViewById(R.id.listView_pari_termine);
                MesParisFragment.MyAdapter1 adapter = new MesParisFragment.MyAdapter1(getActivity(), liste);
                listView.setAdapter(adapter);
                listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                        //HomeFragmentDirection.
                        MesParisFragmentDirections.ActionNavMesParisToNavHistorique action = MesParisFragmentDirections.actionNavMesParisToNavHistorique();
                        action.setIdParis(liste.get(i).get_id());
                        action.setStatus("termine");
                        //Navigation.findNavController(view).navigate(R.id.nav_pari);
                        Navigation.findNavController(view).navigate(action);
                    }
                });
            }
            @Override
            public void onFailure(Call<List<PariSportDoc>> call, Throwable t) {
                Log.e(TAG, "onFailureMesPariFragment: "+t.getMessage());
            }
        });



        return root;
    }

    private void init(){}

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    class MyAdapter1 extends ArrayAdapter<PariSportDoc> {

        Context context;
        List<PariSportDoc> pariSport;

        MyAdapter1(Context c, List<PariSportDoc> pariSport) {
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
            PariSportDoc pari = pariSport.get(position);
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