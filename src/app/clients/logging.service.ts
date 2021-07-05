import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppService} from './app.service';
import {Clients} from './clients';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private currentClientsSubject: BehaviorSubject<Clients>;
  public currentClients: Observable<Clients>;
  constructor(private http: HttpClient, private appService: AppService) {
    this.currentClientsSubject = new BehaviorSubject<Clients>(JSON.parse(localStorage.getItem('currentClients')));
    this.currentClients = this.currentClientsSubject.asObservable();
  }
  public get currentClientsValue(): Clients {
    return this.currentClientsSubject.value;
  }
  login(name: string, password: string) {
    return this.http.post<any>('api/authentification', { name, password }).pipe(map(Clients => {
      console.log(JSON.stringify(Clients));
      if (Clients && Clients.token) {
        console.log(JSON.stringify(Clients));
        localStorage.setItem('currentClients', JSON.stringify(Clients));
        this.currentClientsSubject.next(Clients);
        this.appService.setUserLoggedIn(true);
        return Clients;
      }

    }));
  }

  logout() {
    localStorage.removeItem('currentClients');
    this.appService.setUserLoggedIn(false);
    this.currentClientsSubject.next(null);
  }
}
