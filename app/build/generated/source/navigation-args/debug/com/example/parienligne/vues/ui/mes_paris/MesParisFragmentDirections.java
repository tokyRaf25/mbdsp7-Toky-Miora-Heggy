package com.example.parienligne.vues.ui.mes_paris;

import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.navigation.NavDirections;
import com.example.parienligne.R;
import java.lang.IllegalArgumentException;
import java.lang.Object;
import java.lang.Override;
import java.lang.String;
import java.lang.SuppressWarnings;
import java.util.HashMap;

public class MesParisFragmentDirections {
  private MesParisFragmentDirections() {
  }

  @NonNull
  public static ActionNavMesParisToNavHistorique actionNavMesParisToNavHistorique() {
    return new ActionNavMesParisToNavHistorique();
  }

  public static class ActionNavMesParisToNavHistorique implements NavDirections {
    private final HashMap arguments = new HashMap();

    private ActionNavMesParisToNavHistorique() {
    }

    @NonNull
    @SuppressWarnings("unchecked")
    public ActionNavMesParisToNavHistorique setIdParis(@NonNull String idParis) {
      if (idParis == null) {
        throw new IllegalArgumentException("Argument \"idParis\" is marked as non-null but was passed a null value.");
      }
      this.arguments.put("idParis", idParis);
      return this;
    }

    @NonNull
    @SuppressWarnings("unchecked")
    public ActionNavMesParisToNavHistorique setStatus(@NonNull String status) {
      if (status == null) {
        throw new IllegalArgumentException("Argument \"status\" is marked as non-null but was passed a null value.");
      }
      this.arguments.put("status", status);
      return this;
    }

    @Override
    @SuppressWarnings("unchecked")
    @NonNull
    public Bundle getArguments() {
      Bundle __result = new Bundle();
      if (arguments.containsKey("idParis")) {
        String idParis = (String) arguments.get("idParis");
        __result.putString("idParis", idParis);
      } else {
        __result.putString("idParis", "default");
      }
      if (arguments.containsKey("status")) {
        String status = (String) arguments.get("status");
        __result.putString("status", status);
      } else {
        __result.putString("status", "en_cours");
      }
      return __result;
    }

    @Override
    public int getActionId() {
      return R.id.action_nav_mes_paris_to_nav_historique;
    }

    @SuppressWarnings("unchecked")
    @NonNull
    public String getIdParis() {
      return (String) arguments.get("idParis");
    }

    @SuppressWarnings("unchecked")
    @NonNull
    public String getStatus() {
      return (String) arguments.get("status");
    }

    @Override
    public boolean equals(Object object) {
      if (this == object) {
          return true;
      }
      if (object == null || getClass() != object.getClass()) {
          return false;
      }
      ActionNavMesParisToNavHistorique that = (ActionNavMesParisToNavHistorique) object;
      if (arguments.containsKey("idParis") != that.arguments.containsKey("idParis")) {
        return false;
      }
      if (getIdParis() != null ? !getIdParis().equals(that.getIdParis()) : that.getIdParis() != null) {
        return false;
      }
      if (arguments.containsKey("status") != that.arguments.containsKey("status")) {
        return false;
      }
      if (getStatus() != null ? !getStatus().equals(that.getStatus()) : that.getStatus() != null) {
        return false;
      }
      if (getActionId() != that.getActionId()) {
        return false;
      }
      return true;
    }

    @Override
    public int hashCode() {
      int result = 1;
      result = 31 * result + (getIdParis() != null ? getIdParis().hashCode() : 0);
      result = 31 * result + (getStatus() != null ? getStatus().hashCode() : 0);
      result = 31 * result + getActionId();
      return result;
    }

    @Override
    public String toString() {
      return "ActionNavMesParisToNavHistorique(actionId=" + getActionId() + "){"
          + "idParis=" + getIdParis()
          + ", status=" + getStatus()
          + "}";
    }
  }
}
