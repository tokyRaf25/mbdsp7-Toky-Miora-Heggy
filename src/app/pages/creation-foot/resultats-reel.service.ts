import { Injectable } from '@angular/core';
import { ResultatsReel} from "./resultats-reel.model";
import {Observable} from 'rxjs';
import { HttpClient,HttpHeaders } from "@angular/common/http"; 
@Injectable({
  providedIn: 'root'
})
export class ResultatsReelService {
  uri = "http://localhost:4000/api";

  constructor( private http:HttpClient) { }

  addResultatsReel(result:ResultatsReel):Observable<any> {
    return this.http.post(this.uri+"/resultats_reel", result);
  }
  deleteResultatsReel(id:String):Observable<any> {  
    return this.http.delete("http://localhost:4000/resultats_reel/pari/"+id);
  }
}
