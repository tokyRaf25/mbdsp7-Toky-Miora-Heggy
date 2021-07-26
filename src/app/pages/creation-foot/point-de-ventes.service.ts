import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { PointDeVentes, PointDeVentesModele } from './point-de-ventes.model';

@Injectable({
  providedIn: 'root'
})
export class PointDeVentesService {
  uri = "http://localhost:4000/api";
  constructor(private http:HttpClient) { }

  getAllPointDeVentes():Observable<PointDeVentes[]> {
    return this.http.get<PointDeVentes[]>(this.uri+"/point_de_vente");
  }
  getAllPointDeVentesPagine(page:Number, limit:Number):Observable<PointDeVentesModele> {
    return this.http.get<PointDeVentesModele>(this.uri+"/point_de_vente"+"?page="+page + "&limit="+limit);
  }
  deletePointDeVentes(id:String):Observable<any> {  
    return this.http.delete(this.uri+"/point_de_vente/"+id);
  }
  addPointDeVentes(pv:PointDeVentes):Observable<any> {
    return this.http.post(this.uri+"/point_de_vente", pv);
   }
   updatePointDeVentes(pv:PointDeVentes):Observable<any> {  
    return this.http.put(this.uri+"/point_de_vente",pv);
  }
}
