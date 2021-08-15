package com.example.parienligne.vues.adapter;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Build;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.recyclerview.widget.RecyclerView;

import com.example.parienligne.R;
import com.example.parienligne.models.ChampCategorieSubItem;
import com.example.parienligne.models.ClientRequest;
import com.example.parienligne.models.ClientResponse;
import com.example.parienligne.models.Doc_Resultats_predits;
import com.example.parienligne.models.InfoClient;
import com.example.parienligne.models.ItemCategorie;
import com.example.parienligne.models.PanierItem;
import com.example.parienligne.models.ResponsePost;
import com.example.parienligne.outils.LoadingDialog;
import com.example.parienligne.outils.SessionSharedPreferences;
import com.example.parienligne.services.IServiceClient;
import com.example.parienligne.services.IServiceResultatPredit;
import com.example.parienligne.services.RetrofitClient;
import com.example.parienligne.vues.AccueilActivity;
import com.example.parienligne.vues.LoginActivity;

import org.jetbrains.annotations.NotNull;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PanierItemAdapter extends RecyclerView.Adapter<PanierItemAdapter.ItemViewHolder>{

    private View view;
    public List<PanierItem> itemList = new ArrayList<>();
    private String idPariSport;
    private final PanierItemAdapter.OnItemClickListener listener;
    LoadingDialog loadingDialog;
    private Context context;
    TextView mise_total;
    TextView gain_total;
    ImageView img_del_all;


    public PanierItemAdapter(Context context, View view, String idPariSport, OnItemClickListener listener){
        this.view = view;
        this.idPariSport = idPariSport;
        this.listener = listener;
        this.context = context;
    }

    @NonNull
    @NotNull
    @Override
    public ItemViewHolder onCreateViewHolder(@NonNull @NotNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.row_add_panier, parent, false);
        loadingDialog = new LoadingDialog(getActivity());

        return new PanierItemAdapter.ItemViewHolder(view);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onBindViewHolder(@NonNull @NotNull ItemViewHolder holder, int position) {
        PanierItem item = itemList.get(position);
        String TAG = "AccueilActivity";
        Log.e(TAG, "atoo");
        holder.nomChamp.setText(item.getChamp());
        holder.cote.setText(item.getCote()+"");
        holder.equipe.setText(item.getEquipe());
        holder.bind(itemList.get(position), listener);
        view.findViewById(R.id.btn_placer_pari).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //loadingDialog.startingLoadingDialog();
                ShowAlertDialog();

                //loadingDialog.dismissDialog();
            }
        });

    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void ShowAlertDialog(){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDateTime now = LocalDateTime.now();
        AlertDialog.Builder builder1 = new AlertDialog.Builder(context);
        builder1.setMessage("Voulez vous confirmer votre achat de pari?");
        builder1.setCancelable(true);
        builder1.setPositiveButton(
                "Oui",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        for(PanierItem item : itemList){
                            TextView textMiseTotal = view.findViewById(R.id.txt_gain_total);
                            double miseTotal = Double.parseDouble(textMiseTotal.getText().toString().split(" ")[0]);
                            double gain = item.getCote() * item.getMise();
                            Doc_Resultats_predits resultat = new Doc_Resultats_predits(SessionSharedPreferences.getIdClient(getActivity()),item.getId_champ(),idPariSport, item.getCote(), item.getMise(), gain,0, now.toString(), miseTotal );
                            callWS(resultat);
                        }
                    }
                });

        builder1.setNegativeButton(
                "Non",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.cancel();
                    }
                });

        AlertDialog alert11 = builder1.create();
        alert11.show();
    }

    public void callWS(Doc_Resultats_predits resultats_predits){
        IServiceResultatPredit service = RetrofitClient.getRetrofitInstance().create(IServiceResultatPredit.class);
        Call<ResponsePost> response = service.postResultatPredit(resultats_predits);
        response.enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) {
                ResponsePost retour = (ResponsePost) response.body();
                if(retour.getStatus().equals("ok")){
                    Toast.makeText(context, "Votre pari a été mise en place", Toast.LENGTH_LONG).show();
                }else if(retour.getStatus().equals("erreur")){
                    Toast.makeText(context, "Une erreur s'est produite: "+retour.getMessage(), Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call call, Throwable t) {

            }
        });
    }

    private Activity getActivity() {
        Context context = view.getContext();
        while (context instanceof ContextWrapper) {
            if (context instanceof Activity) {
                return (Activity)context;
            }
            context = ((ContextWrapper)context).getBaseContext();
        }
        return null;
    }

    @Override
    public int getItemCount() {
        return itemList.size();
    }

    public void updateData(List<PanierItem> elements_panier){
        itemList.clear();
        itemList.addAll(elements_panier);
        this.notifyDataSetChanged();
        updateGainPotentielEtMontantTotal();

    }

    public void updateGainPotentielEtMontantTotal(){
        double jetons = 0;
        double gain = 0;
        mise_total = view.findViewById(R.id.txt_mise_total);
        gain_total = view.findViewById(R.id.txt_gain_total);
        try {
                for(PanierItem item : itemList){
                    jetons += item.getMise();
                    gain += item.getMise() * item.getCote();
                }
                mise_total.setText(jetons+""+ " Jetons");
                gain_total.setText(gain+""+ " Jetons");


        }catch (NumberFormatException e){
            mise_total.setText("0"+ " Jeton");
            gain_total.setText("0"+ " Jeton");
        }
    }

    public class ItemViewHolder extends RecyclerView.ViewHolder {

        TextView nomChamp;
        TextView cote;
        TextView equipe;
        EditText mise;
        TextView gain;
        Button btn_200;
        Button btn_400;
        Button btn_600;
        TextView mise_total;
        TextView gain_total;

        public ItemViewHolder(@NonNull @NotNull View itemView) {
            super(itemView);
            nomChamp = itemView.findViewById(R.id.txt_champ);
            cote = itemView.findViewById(R.id.txt_cote);
            equipe = itemView.findViewById(R.id.txt_equipe);
        }

        public void bind(final PanierItem item,final PanierItemAdapter.OnItemClickListener listener) {
            mise = itemView.findViewById(R.id.edit_mise);
            gain = itemView.findViewById(R.id.txt_gain);
            btn_200 = itemView.findViewById(R.id.btn_200);
            btn_400 = itemView.findViewById(R.id.btn_400);
            btn_600 = itemView.findViewById(R.id.btn_600);
            this.mise_total = view.findViewById(R.id.txt_mise_total);
            this.gain_total = view.findViewById(R.id.txt_gain_total);

            itemView.findViewById(R.id.btn_supprimer).setOnClickListener(new View.OnClickListener() {
                @Override public void onClick(View v) {
                    listener.onItemClickDelete(item);
                }
            });

            mise.addTextChangedListener(new TextWatcher() {
                @Override
                public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

                }

                @Override
                public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

                }

                @Override
                public void afterTextChanged(Editable editable) {
                    updateMiseCote(item);
                    updateMisePanier(item);
                    listener.OnChangeMise(item);
                    updateGainPotentielEtMontantTotal();
                }
            });

            btn_200.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    mise.setText((Integer.parseInt(mise.getText().toString())+200)+"");
                    updateMisePanier(item);
                    updateMiseCote(item);
                    updateGainPotentielEtMontantTotal();
                }
            });

            btn_400.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    mise.setText((Integer.parseInt(mise.getText().toString())+400)+"");
                    updateMisePanier(item);
                    updateMiseCote(item);
                    updateGainPotentielEtMontantTotal();
                }
            });

            btn_600.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    mise.setText((Integer.parseInt(mise.getText().toString())+600)+"");
                    updateMisePanier(item);
                    updateMiseCote(item);
                    updateGainPotentielEtMontantTotal();
                }
            });

        }

        public void updateMiseCote(PanierItem item){
            try{
                Double miseCote = Double.parseDouble(mise.getText().toString()) * Double.parseDouble(cote.getText().toString());
                //item.setMise();
                gain.setText(miseCote+" Jetons");
            }catch(NumberFormatException e){
                gain.setText("0"+" Jeton");
            }
        }

        public void updateGainPotentielEtMontantTotal(){
            double jetons = 0;
            double gain = 0;
            try {
                for(PanierItem item : itemList){
                    jetons += item.getMise();
                    gain += item.getMise() * item.getCote();
                }
                mise_total.setText(jetons+""+ " Jetons");
                gain_total.setText(gain+""+ " Jetons");
            }catch (NumberFormatException e){
                mise_total.setText("0"+ " Jeton");
                gain_total.setText("0"+ " Jeton");
            }
        }
        public void updateMisePanier(PanierItem item){
            try{
                item.setMise(Double.parseDouble(mise.getText().toString()));
            }catch(NumberFormatException e){
                item.setMise(0);
            }
        }
    }

    public interface OnItemClickListener {
        void onItemClickDelete(PanierItem item);
        void OnChangeMise(PanierItem item);
        void OnClickBtn200(PanierItem item);
        void OnClickBtn400(PanierItem item);
        void OnClickBtn600(PanierItem item);
    }
}
