import { Injectable } from '@angular/core';
import { MouvementBancaire} from "./change.model";
import {Observable} from 'rxjs';
import { HttpClient,HttpHeaders } from "@angular/common/http"; 
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChangeService {

  uri = "http://localhost:8080/Api";
  httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };
  constructor( private http:HttpClient) { }

  debitmouvementbancaire(somme: number, motdepasse: string,numerosdecompte: string,typeMouvement: string):Observable<MouvementBancaire> {
    return this.http.post<MouvementBancaire>(this.uri+"/mouvementbancaire", {somme,motdepasse,numerosdecompte,typeMouvement});
  }
}
