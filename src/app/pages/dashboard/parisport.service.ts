import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Parisport , ParisportModele } from "./parisport";
import { HttpClient,HttpHeaders } from "@angular/common/http"; 
@Injectable({
  providedIn: 'root'
})
export class ParisportService {
  uri = "http://localhost:4000/api";
  httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };

  constructor( private http:HttpClient) { }
  
  addAssignment(pari_sport:Parisport):Observable<any> {
	 return this.http.post(this.uri+"/pari", pari_sport);
  }
  
  getPariSport():Observable<Parisport[]> {
    return this.http.get<Parisport[]>(this.uri+"/pari");
  }

  getPariSportByType(type:String):Observable<Parisport[]> {
    return this.http.get<Parisport[]>(this.uri+"/pari/type/"+type);
  }

  getPariSportPagine(page:Number, limit:Number):Observable<ParisportModele> {
    return this.http.get<ParisportModele>(this.uri+"/pari"+"?page="+page + "&limit="+limit);
  }

  deletePariSport(id:String):Observable<any> {  
    return this.http.delete(this.uri+"/pari/" +id);
  }

  getDetailPariSport(id:String):Observable<ParisportModele>{
    return this.http.get<ParisportModele>(this.uri+"/pariAvecCote/"+id);
  }

  getParisSportById(id:String):Observable<Parisport> {  
    return this.http.get<Parisport>(this.uri+"/pari/" +id);
  }
}
