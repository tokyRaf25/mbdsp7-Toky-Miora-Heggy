import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Cote  } from "./cote.model";
import { HttpClient,HttpHeaders } from "@angular/common/http"; 
@Injectable({
  providedIn: 'root'
})
export class CoteService {
  uri = "http://localhost:4000/api";
  constructor( private http:HttpClient) { }

  addCote(cote:Cote):Observable<any> {
    return this.http.post(this.uri+"/cote", cote);
   }
}
