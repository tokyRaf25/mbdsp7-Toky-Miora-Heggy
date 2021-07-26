import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { Client, ClientModele } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  uri = "http://localhost:4000/api";
  constructor(private http:HttpClient) { }

  getAllClient():Observable<Client[]> {
    return this.http.get<Client[]>(this.uri+"/clients");
  }
  getAllClientPagine(page:Number, limit:Number):Observable<ClientModele> {
    return this.http.get<ClientModele>(this.uri+"/clients"+"?page="+page + "&limit="+limit);
  }
  deleteClient(id:String):Observable<any> {  
    return this.http.delete(this.uri+"/clients/" +id);
  }
}
