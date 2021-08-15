package com.example.parienligne.vues.ui.historique;

import android.content.Context;
import android.graphics.Color;
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
import com.example.parienligne.databinding.FragmentHistoriqueBinding;
import com.example.parienligne.models.Historique;
import com.example.parienligne.models.PariSport;
import com.example.parienligne.outils.LoadingDialog;
import com.example.parienligne.outils.SessionSharedPreferences;
import com.example.parienligne.services.IServicePariSport;
import com.example.parienligne.services.IServiceResultatPredit;
import com.example.parienligne.services.RetrofitClient;
import com.example.parienligne.vues.ui.home.HomeFragment;
import com.example.parienligne.vues.ui.home.HomeFragmentDirections;
import com.example.parienligne.vues.ui.parier.PariFragmentArgs;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class HistoriqueFragment extends Fragment {

    private static final String TAG = "HistoriqueFragment";
    ListView listView;
    private HistoriqueViewModel historiqueViewModel;
    private FragmentHistoriqueBinding binding;
    LoadingDialog loadingDialog;
    private String idPari;
    private String status_receive;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        historiqueViewModel =
                new ViewModelProvider(this).get(HistoriqueViewModel.class);

        init();
        binding = FragmentHistoriqueBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        loadingDialog.startingLoadingDialog();
        IServiceResultatPredit service = RetrofitClient.getRetrofitInstance().create(IServiceResultatPredit.class);
        if(getArguments() != null){
            HistoriqueFragmentArgs args = HistoriqueFragmentArgs.fromBundle(getArguments());
            idPari = args.getIdParis();
            status_receive = args.getStatus();
        }
        Call<List<Historique>> historiqueCall = service.getPariSportUser(idPari , SessionSharedPreferences.getIdClient(getActivity()));
        historiqueCall.enqueue(new Callback<List<Historique>>() {
            @Override
            public void onResponse(Call<List<Historique>> call, Response<List<Historique>> response) {
                Log.e(TAG, "onResponse: code : "+response.code());
                List<Historique> liste = response.body();
                listView = root.findViewById(R.id.list_historique);
                MyAdapter adapter = new MyAdapter(getActivity(), liste);
                listView.setAdapter(adapter);
                loadingDialog.dismissDialog();
            }
            @Override
            public void onFailure(Call<List<Historique>> call, Throwable t) {
                Log.e(TAG, "onFailure: "+t.getMessage());
            }
        });
        return root;
    }

    private void init(){
        loadingDialog = new LoadingDialog(getActivity());
    }
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }


    class MyAdapter extends ArrayAdapter<Historique> {

        Context context;
        List<Historique> historiques;

        MyAdapter(Context c, List<Historique> historique) {
            super(c, R.layout.row, historique);
            this.context = c;
            this.historiques = historique;

        }

        @NonNull
        @Override
        public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
            LayoutInflater layoutInflater = (LayoutInflater) getActivity().getApplicationContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            View row = layoutInflater.inflate(R.layout.row_historique, parent, false);

            TextView equipes = row.findViewById(R.id.txt_equipe);
            TextView cotes = row.findViewById(R.id.txt_cote_h);
            TextView categorie = row.findViewById(R.id.txt_categorie_h);
            TextView champ = row.findViewById(R.id.txt_champ_h);
            TextView mise = row.findViewById(R.id.txt_mise_h);
            TextView gain = row.findViewById(R.id.txt_gain_h);
            TextView status = row.findViewById(R.id.txt_status_h);

            Historique historique = historiques.get(position);
            equipes.setText(historique.getPariSport().getEquipes().get(0).getNomEquipe()+" - "+historique.getPariSport().getEquipes().get(1).getNomEquipe());
            cotes.setText(historique.getCotes()+"");
            categorie.setText(historique.getCategorie());
            champ.setText(historique.getChamp());
            mise.setText(historique.getMise()+"");
            gain.setText(historique.getGain()+"");
            if(status_receive.equals("termine")){
                if(historique.getStatus()==0){
                    status.setText("Perdu");
                    status.setTextColor(Color.parseColor("#d13224"));

                }
                else if(historique.getStatus()==1){
                    status.setText("Gagnant");
                    status.setTextColor(Color.parseColor("#11cf46"));
                }
            }else{
                status.setText("En cours");
                status.setTextColor(Color.parseColor("#3751b0"));
            }


            return row;
        }
    }
}