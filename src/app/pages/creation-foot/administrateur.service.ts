import { Injectable } from '@angular/core';
import { Administrateur,AdministrateurModel} from "./administrateur.model";
import {Observable} from 'rxjs';
import { HttpClient,HttpErrorResponse,HttpHeaders } from "@angular/common/http"; 
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {
  uri = "http://localhost:4000";

  constructor( private http:HttpClient) { }

  authentificate(admin:Administrateur):Observable<AdministrateurModel> {
    return this.http.post<AdministrateurModel>(this.uri+"/authentification", admin);
  }
}
