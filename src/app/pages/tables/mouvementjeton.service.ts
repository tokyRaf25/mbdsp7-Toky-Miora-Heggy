import { Injectable } from '@angular/core';
import { MouvementJeton,MouvementJetonModel} from "./mouvementjeton.model";
import {Observable} from 'rxjs';
import { HttpClient,HttpHeaders } from "@angular/common/http"; 
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MouvementjetonService {

  uri = "https://apinodeapp.herokuapp.com/api";

  constructor( private http:HttpClient) { }

  insertMouvementJeton(mouvementjeton:MouvementJeton):Observable<MouvementJeton> {
    return this.http.post<MouvementJeton>(this.uri+"/mouvementJeton", MouvementJeton);
  }

  getMouvementJeton(idClient:string,dateMouvement:string):Observable<MouvementJetonModel> {
    return this.http.get<MouvementJetonModel>(this.uri+"/mouvementJeton?idClient="+idClient+"&dateMouvement="+dateMouvement);
  }

}
