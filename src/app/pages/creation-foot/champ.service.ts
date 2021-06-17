import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Champ,ChampModele } from "./champ.model";
import { HttpClient,HttpHeaders } from "@angular/common/http"; 

@Injectable({
  providedIn: 'root'
})
export class ChampService {
  uri = "http://localhost:4000/api";
  constructor(private http:HttpClient) { }

  getChamp(id:String):Observable<Champ[]> {
    return this.http.get<Champ[]>(this.uri+"/champParCat");
  }

  getAllChampPagine(page:Number, limit:Number):Observable<ChampModele> {
    return this.http.get<ChampModele>(this.uri+"/champParCat"+"?page="+page + "&limit="+limit);
  }

  deleteChamp(id:String):Observable<any> {  
    return this.http.delete(this.uri+"/champParCat/" +id);
  }
}
