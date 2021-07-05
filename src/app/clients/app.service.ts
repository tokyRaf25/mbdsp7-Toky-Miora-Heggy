import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private clientLoggedIn = new Subject<boolean>();

  constructor() {
    this.clientLoggedIn.next(false);
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.clientLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.clientLoggedIn.asObservable();
  }
}
