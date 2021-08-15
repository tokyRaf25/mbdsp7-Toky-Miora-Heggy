package com.example.parienligne.vues.adapter;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.parienligne.R;
import com.example.parienligne.models.ChampCategorieSubItem;
import com.example.parienligne.models.PanierItem;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;

public class ChampCategorieSubItemAdapter extends RecyclerView.Adapter<ChampCategorieSubItemAdapter.SubItemViewHolder>{

    private List<ChampCategorieSubItem> subItemList;
    private final OnItemClickListener listener;


    public ChampCategorieSubItemAdapter(List<ChampCategorieSubItem> subItemList, OnItemClickListener listener){
        this.subItemList = subItemList;
        this.listener = listener;
    }

    @NonNull
    @NotNull
    @Override
    public ChampCategorieSubItemAdapter.SubItemViewHolder onCreateViewHolder(@NonNull @NotNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.row_champ, parent, false);
        return new SubItemViewHolder(view);
    }


    @Override
    public void onBindViewHolder(@NonNull @NotNull ChampCategorieSubItemAdapter.SubItemViewHolder holder, int position) {
        ChampCategorieSubItem subItem = subItemList.get(position);
        holder.nomChamp.setText(subItem.getSubItemNomChamp());
        holder.cote.setText(subItem.getSubItemCote());
        holder.bind(subItemList.get(position), listener);
    }


    @Override
    public int getItemCount() {
        return subItemList.size();
    }

    public class SubItemViewHolder extends RecyclerView.ViewHolder {
        CardView cardView;
        TextView nomChamp;
        TextView cote;

        public SubItemViewHolder(@NonNull @NotNull View itemView) {
            super(itemView);
            nomChamp = itemView.findViewById(R.id.txt_champ);
            cote = itemView.findViewById(R.id.txt_cote);
            cardView = itemView.findViewById(R.id.card_champ);
        }

        public void bind(final ChampCategorieSubItem champCategorieSubItem,final OnItemClickListener listener) {
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override public void onClick(View v) {
                    Log.e("AccueilActivity", "ilay item = "+champCategorieSubItem.getSubItemNomChamp()+ "");
                    listener.onItemClick(champCategorieSubItem);
                }
            });
        }
    }
    public interface OnItemClickListener {
        void onItemClick(ChampCategorieSubItem item);
    }


}
