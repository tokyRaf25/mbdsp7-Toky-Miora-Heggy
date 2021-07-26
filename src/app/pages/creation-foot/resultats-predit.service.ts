import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';

@Injectable({
  providedIn: 'root'
})
export class ResultatsPreditService {
  uri = "http://localhost:4000/api";

  constructor( private http:HttpClient) { }

  updateResultatPredit(id:String):Observable<any>{
    return this.http.put(this.uri+"/resultats_predit/"+id,null);
  }
}
