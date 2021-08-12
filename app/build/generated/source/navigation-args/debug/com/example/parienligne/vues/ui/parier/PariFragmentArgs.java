package com.example.parienligne.vues.ui.parier;

import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.navigation.NavArgs;
import java.lang.IllegalArgumentException;
import java.lang.Object;
import java.lang.Override;
import java.lang.String;
import java.lang.SuppressWarnings;
import java.util.HashMap;

public class PariFragmentArgs implements NavArgs {
  private final HashMap arguments = new HashMap();

  private PariFragmentArgs() {
  }

  @SuppressWarnings("unchecked")
  private PariFragmentArgs(HashMap argumentsMap) {
    this.arguments.putAll(argumentsMap);
  }

  @NonNull
  @SuppressWarnings("unchecked")
  public static PariFragmentArgs fromBundle(@NonNull Bundle bundle) {
    PariFragmentArgs __result = new PariFragmentArgs();
    bundle.setClassLoader(PariFragmentArgs.class.getClassLoader());
    if (bundle.containsKey("message")) {
      String message;
      message = bundle.getString("message");
      if (message == null) {
        throw new IllegalArgumentException("Argument \"message\" is marked as non-null but was passed a null value.");
      }
      __result.arguments.put("message", message);
    } else {
      __result.arguments.put("message", "default");
    }
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
    return __result;
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

  @SuppressWarnings("unchecked")
  @NonNull
  public Bundle toBundle() {
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
  public boolean equals(Object object) {
    if (this == object) {
        return true;
    }
    if (object == null || getClass() != object.getClass()) {
        return false;
    }
    PariFragmentArgs that = (PariFragmentArgs) object;
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
    return true;
  }

  @Override
  public int hashCode() {
    int result = 1;
    result = 31 * result + (getMessage() != null ? getMessage().hashCode() : 0);
    result = 31 * result + (getIdParis() != null ? getIdParis().hashCode() : 0);
    return result;
  }

  @Override
  public String toString() {
    return "PariFragmentArgs{"
        + "message=" + getMessage()
        + ", idParis=" + getIdParis()
        + "}";
  }

  public static class Builder {
    private final HashMap arguments = new HashMap();

    @SuppressWarnings("unchecked")
    public Builder(PariFragmentArgs original) {
      this.arguments.putAll(original.arguments);
    }

    public Builder() {
    }

    @NonNull
    public PariFragmentArgs build() {
      PariFragmentArgs result = new PariFragmentArgs(arguments);
      return result;
    }

    @NonNull
    @SuppressWarnings("unchecked")
    public Builder setMessage(@NonNull String message) {
      if (message == null) {
        throw new IllegalArgumentException("Argument \"message\" is marked as non-null but was passed a null value.");
      }
      this.arguments.put("message", message);
      return this;
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
  }
}
