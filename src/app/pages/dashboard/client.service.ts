import { Injectable } from '@angular/core';
import { Client,ClientModel} from "./client.model";
import {Observable} from 'rxjs';
import { HttpClient,HttpHeaders } from "@angular/common/http"; 
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  uri = "http://localhost:4000/api";

  constructor( private http:HttpClient) { }

  authentificate(client:Client):Observable<ClientModel> {
    return this.http.post<ClientModel>(this.uri+"/authentification", client);
  }

  registration(client:Client):Observable<ClientModel> {
    return this.http.post<ClientModel>(this.uri+"/registration", client);
  }

  updateJeton(client:Client):Observable<ClientModel> {
    return this.http.post<ClientModel>(this.uri+"/updateJeton", client);
  }

  updateClient(client:Client):Observable<ClientModel> {
    return this.http.post<ClientModel>(this.uri+"/updateClient", client);
  }

  updateClientPassword(client:Client):Observable<ClientModel> {
    return this.http.post<ClientModel>(this.uri+"/updateClientPassword", client);
  }

  getJeton(id:String):Observable<ClientModel> {
    return this.http.get<ClientModel>(this.uri+"/getJeton/"+id);
  }

}
