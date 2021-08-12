package com.example.parienligne.vues.ui.home;

import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.navigation.ActionOnlyNavDirections;
import androidx.navigation.NavDirections;
import com.example.parienligne.R;
import java.lang.IllegalArgumentException;
import java.lang.Object;
import java.lang.Override;
import java.lang.String;
import java.lang.SuppressWarnings;
import java.util.HashMap;

public class HomeFragmentDirections {
  private HomeFragmentDirections() {
  }

  @NonNull
  public static ActionNavHomeToNavPari actionNavHomeToNavPari() {
    return new ActionNavHomeToNavPari();
  }

  @NonNull
  public static NavDirections actionNavHomeToNavGallery() {
    return new ActionOnlyNavDirections(R.id.action_nav_home_to_nav_gallery);
  }

  @NonNull
  public static NavDirections actionNavHomeToNavMap() {
    return new ActionOnlyNavDirections(R.id.action_nav_home_to_nav_map);
  }

  @NonNull
  public static NavDirections actionNavHomeToNavMesParis() {
    return new ActionOnlyNavDirections(R.id.action_nav_home_to_nav_mes_paris);
  }

  public static class ActionNavHomeToNavPari implements NavDirections {
    private final HashMap arguments = new HashMap();

    private ActionNavHomeToNavPari() {
    }

    @NonNull
    @SuppressWarnings("unchecked")
    public ActionNavHomeToNavPari setMessage(@NonNull String message) {
      if (message == null) {
        throw new IllegalArgumentException("Argument \"message\" is marked as non-null but was passed a null value.");
      }
      this.arguments.put("message", message);
      return this;
    }

    @NonNull
    @SuppressWarnings("unchecked")
    public ActionNavHomeToNavPari setIdParis(@NonNull String idParis) {
      if (idParis == null) {
        throw new IllegalArgumentException("Argument \"idParis\" is marked as non-null but was passed a null value.");
      }
      this.arguments.put("idParis", idParis);
      return this;
    }

    @Override
    @SuppressWarnings("unchecked")
    @NonNull
    public Bundle getArguments() {
      Bundle __result = new Bundle();
      if (arguments.containsKey("message")) {
        String message = (String) arguments.get("message");
        __result.putString("message", message);
      } else {
        __result.putString("message", "default");
      }
      if (arguments.containsKey("idParis")) {
        String idParis = (String) arguments.get("idParis");
        __result.putString("idParis", idParis);
      } else {
        __result.putString("idParis", "default");
      }
      return __result;
    }

    @Override
    public int getActionId() {
      return R.id.action_nav_home_to_nav_pari;
    }

    @SuppressWarnings("unchecked")
    @NonNull
    public String getMessage() {
      return (String) arguments.get("message");
    }

    @SuppressWarnings("unchecked")
    @NonNull
    public String getIdParis() {
      return (String) arguments.get("idParis");
    }

    @Override
    public boolean equals(Object object) {
      if (this == object) {
          return true;
      }
      if (object == null || getClass() != object.getClass()) {
          return false;
      }
      ActionNavHomeToNavPari that = (ActionNavHomeToNavPari) object;
      if (arguments.containsKey("message") != that.arguments.containsKey("message")) {
        return false;
      }
      if (getMessage() != null ? !getMessage().equals(that.getMessage()) : that.getMessage() != null) {
        return false;
      }
      if (arguments.containsKey("idParis") != that.arguments.containsKey("idParis")) {
        return false;
      }
      if (getIdParis() != null ? !getIdParis().equals(that.getIdParis()) : that.getIdParis() != null) {
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
      result = 31 * result + (getMessage() != null ? getMessage().hashCode() : 0);
      result = 31 * result + (getIdParis() != null ? getIdParis().hashCode() : 0);
      result = 31 * result + getActionId();
      return result;
    }

    @Override
    public String toString() {
      return "ActionNavHomeToNavPari(actionId=" + getActionId() + "){"
          + "message=" + getMessage()
          + ", idParis=" + getIdParis()
          + "}";
    }
  }
}
