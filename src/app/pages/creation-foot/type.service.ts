import { Injectable } from '@angular/core';
import { Type,TypeModele} from "./type";
import {Observable} from 'rxjs';
import { HttpClient,HttpHeaders } from "@angular/common/http"; 

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  uri = "http://localhost:4000/api";

  constructor( private http:HttpClient) { }
  getAllTypePari():Observable<TypeModele> {
    return this.http.get<TypeModele>(this.uri+"/typeParie");
  }

  addType(type:Type):Observable<any> {
    return this.http.post(this.uri+"/typeParie", type);
   }
 
}
