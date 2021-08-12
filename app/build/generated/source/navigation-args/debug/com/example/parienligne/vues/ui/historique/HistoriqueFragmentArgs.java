package com.example.parienligne.vues.ui.historique;

import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.navigation.NavArgs;
import java.lang.IllegalArgumentException;
import java.lang.Object;
import java.lang.Override;
import java.lang.String;
import java.lang.SuppressWarnings;
import java.util.HashMap;

public class HistoriqueFragmentArgs implements NavArgs {
  private final HashMap arguments = new HashMap();

  private HistoriqueFragmentArgs() {
  }

  @SuppressWarnings("unchecked")
  private HistoriqueFragmentArgs(HashMap argumentsMap) {
    this.arguments.putAll(argumentsMap);
  }

  @NonNull
  @SuppressWarnings("unchecked")
  public static HistoriqueFragmentArgs fromBundle(@NonNull Bundle bundle) {
    HistoriqueFragmentArgs __result = new HistoriqueFragmentArgs();
    bundle.setClassLoader(HistoriqueFragmentArgs.class.getClassLoader());
    if (bundle.containsKey("idParis")) {
      String idParis;
      idParis = bundle.getString("idParis");
      if (idParis == null) {
        throw new IllegalArgumentException("Argument \"idParis\" is marked as non-null but was passed a null value.");
      }
      __result.arguments.put("idParis", idParis);
    } else {
      __result.arguments.put("idParis", "default");
    }
    if (bundle.containsKey("status")) {
      String status;
      status = bundle.getString("status");
      if (status == null) {
        throw new IllegalArgumentException("Argument \"status\" is marked as non-null but was passed a null value.");
      }
      __result.arguments.put("status", status);
    } else {
      __result.arguments.put("status", "en_cours");
    }
    return __result;
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

  @SuppressWarnings("unchecked")
  @NonNull
  public Bundle toBundle() {
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
  public boolean equals(Object object) {
    if (this == object) {
        return true;
    }
    if (object == null || getClass() != object.getClass()) {
        return false;
    }
    HistoriqueFragmentArgs that = (HistoriqueFragmentArgs) object;
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
    return true;
  }

  @Override
  public int hashCode() {
    int result = 1;
    result = 31 * result + (getIdParis() != null ? getIdParis().hashCode() : 0);
    result = 31 * result + (getStatus() != null ? getStatus().hashCode() : 0);
    return result;
  }

  @Override
  public String toString() {
    return "HistoriqueFragmentArgs{"
        + "idParis=" + getIdParis()
        + ", status=" + getStatus()
        + "}";
  }

  public static class Builder {
    private final HashMap arguments = new HashMap();

    @SuppressWarnings("unchecked")
    public Builder(HistoriqueFragmentArgs original) {
      this.arguments.putAll(original.arguments);
    }

    public Builder() {
    }

    @NonNull
    public HistoriqueFragmentArgs build() {
      HistoriqueFragmentArgs result = new HistoriqueFragmentArgs(arguments);
      return result;
    }

    @NonNull
    @SuppressWarnings("unchecked")
    public Builder setIdParis(@NonNull String idParis) {
      if (idParis == null) {
        throw new IllegalArgumentException("Argument \"idParis\" is marked as non-null but was passed a null value.");
      }
      this.arguments.put("idParis", idParis);
      return this;
    }

    @NonNull
    @SuppressWarnings("unchecked")
    public Builder setStatus(@NonNull String status) {
      if (status == null) {
        throw new IllegalArgumentException("Argument \"status\" is marked as non-null but was passed a null value.");
      }
      this.arguments.put("status", status);
      return this;
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
  }
}
