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
    return this.http.delete(this.uri+"/categorie/" +id+"?token="+localStorage.getItem("token"));
  }
  addCategorie(categorie:Categorie):Observable<any> {
    return this.http.post(this.uri+"/categorie", categorie);
   }
  updateCategorie(categorie:Categorie):Observable<any>{
    return this.http.put(this.uri+"/categorie",categorie);
  }

  createForm(id:string):Observable<CategorieModele>{
     return this.http.get<CategorieModele>(this.uri+"/categorie/" +id)
  }

  getAllCategorieModel():Observable<CategorieModele> {
    return this.http.get<CategorieModele>(this.uri+"/categorie");
  }

  getCategorieParType(id:String):Observable<CategorieModele>{
    return this.http.get<CategorieModele>(this.uri+"/categorie/list/"+id);
  }

  getParisLastInsert():Observable<CategorieModele> {
    return this.http.get<CategorieModele>("http://localhost:4000/categorie/last");
  }

  getChampEtCotePari(id:String,idParie:String):Observable<CategorieModele>{
    return this.http.get<CategorieModele>(this.uri+"/categorie/cote/"+id+"/"+idParie);
  }
}
