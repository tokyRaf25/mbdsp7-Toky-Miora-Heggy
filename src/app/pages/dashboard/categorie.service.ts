import { Injectable } from '@angular/core';
import { Categorie,CategorieModele} from "./categorie.model";
import {Observable} from 'rxjs';
import { HttpClient,HttpHeaders } from "@angular/common/http"; 
@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  uri = "http://localhost:4000/api";

  constructor( private http:HttpClient) { }

  getCategorie(id:String):Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.uri+"/categorie/"+id);
  }

  getAllCategorie():Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.uri+"/categorie");
  }
  getAllCategoriePagine(page:Number, limit:Number):Observable<CategorieModele> {
    return this.http.get<CategorieModele>(this.uri+"/categorie"+"?page="+page + "&limit="+limit);
  }
  deleteCategorie(id:String):Observable<any> {  
    return this.http.delete(this.uri+"/categorie/" +id);
  }
}
