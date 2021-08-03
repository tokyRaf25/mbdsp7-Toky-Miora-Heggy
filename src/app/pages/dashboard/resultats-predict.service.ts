import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient,HttpHeaders } from "@angular/common/http"; 
import { ResultatsPredict } from './resultats-predict.model';

@Injectable({
  providedIn: 'root'
})
export class ResultatsPredictService {
  uri = "https://apinodeapp.herokuapp.com/api";
  constructor( private http:HttpClient) { }

  addParie(resultats_predit:ResultatsPredict):Observable<any> {
    return this.http.post(this.uri+"/resultats_predit", resultats_predit);
  }
}
