package com.example.parienligne.vues.adapter;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.parienligne.R;
import com.example.parienligne.models.ChampCategorieSubItem;
import com.example.parienligne.models.ItemCategorie;
import com.example.parienligne.models.PanierItem;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CategorieItemAdapter extends RecyclerView.Adapter<CategorieItemAdapter.ItemViewHolder>{

    private final String idPariSport;
    private RecyclerView.RecycledViewPool viewPool = new RecyclerView.RecycledViewPool();
    private List<ItemCategorie> itemList;
    private View view;
    private List<PanierItem> itemPanier = new ArrayList<>();
    PanierItemAdapter itemAdapter;
    private Context context;
    //RecyclerView rvItemPanier;
    //LinearLayoutManager layoutManagerPanier;

    public CategorieItemAdapter(Context context, View view, List<ItemCategorie> itemList, String idPariSport){
        this.idPariSport = idPariSport;
        this.itemList = itemList;
        this.view = view;
        this.context = context;
    }

    @NonNull
    @Override
    public ItemViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.row_categorie, parent, false);
        return new ItemViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ItemViewHolder holder, int position) {
        ItemCategorie item = itemList.get(position);
        holder.txtCategorie.setText(item.getNomCategorie());
        // Create layout manager with initial prefetch item count
        LinearLayoutManager layoutManager = new LinearLayoutManager(
                holder.rvSubItem.getContext(),
                LinearLayoutManager.VERTICAL,
                false
        );
        layoutManager.setInitialPrefetchItemCount(item.getSubChampCategorie().size());

        // Pour le panier
        RecyclerView rvItemPanier = view.findViewById(R.id.listview_itemPanier);
        LinearLayoutManager layoutManagerPanier = new LinearLayoutManager(view.getContext());
        itemAdapter = new PanierItemAdapter(context, view, idPariSport, new PanierItemAdapter.OnItemClickListener() {
            @Override
            public void onItemClickDelete(PanierItem item) {
                itemPanier.remove(item);
                itemAdapter.updateData(itemPanier);
            }

            @Override
            public void OnChangeMise(PanierItem item) {

            }

            @Override
            public void OnClickBtn200(PanierItem item) {

            }

            @Override
            public void OnClickBtn400(PanierItem item) {

            }

            @Override
            public void OnClickBtn600(PanierItem item) {

            }
        });

        view.findViewById(R.id.img_del_all).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                itemPanier.clear();
                itemAdapter.updateData(itemPanier);
            }
        });

        rvItemPanier.setLayoutManager(layoutManagerPanier);
        rvItemPanier.setAdapter(itemAdapter);

        holder.rvSubItem.setAdapter(new ChampCategorieSubItemAdapter(item.getSubChampCategorie(), new ChampCategorieSubItemAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(ChampCategorieSubItem itemChamp) {
                PanierItem new_item = new PanierItem(itemChamp.getId(),Double.parseDouble(itemChamp.getSubItemCote()),itemList.get(position).getEquipes(),item.getNomCategorie(), item.getNomCategorie()+"-"+itemChamp.getSubItemNomChamp());
                addItemToPanier(new_item);
                itemAdapter.updateData(itemPanier);
            }
        }));

        holder.rvSubItem.setLayoutManager(layoutManager);
        holder.rvSubItem.setRecycledViewPool(viewPool);
    }

    private void addItemToPanier(PanierItem panierItem){
        boolean isExist = false;
        for(PanierItem item : itemPanier){
            if(item.getChamp() == panierItem.getChamp()){
                isExist = true;
                break;
            }
        }
        if(!isExist){
            itemPanier.add(panierItem);
        }
    }

    @Override
    public int getItemCount() {
        return itemList.size();
    }

    public class ItemViewHolder extends RecyclerView.ViewHolder{
        private TextView txtCategorie;
        private RecyclerView rvSubItem;

        public ItemViewHolder(View itemView) {
            super(itemView);
            txtCategorie = itemView.findViewById(R.id.txt_categorie);
            rvSubItem = itemView.findViewById(R.id.champ_sub_item);
        }
    }

    public void updateReceiptsList(List<PanierItem> newlist, PanierItemAdapter itemAdapter) {
        itemPanier.clear();
        itemPanier.addAll(newlist); 
        itemAdapter.notifyDataSetChanged();
    }

    public List<PanierItem> remplirPanier(){
        List<PanierItem> liste = new ArrayList<>();
        for(PanierItem panier : itemPanier){
            liste.add(panier);
        }
        return liste;
    }

}
