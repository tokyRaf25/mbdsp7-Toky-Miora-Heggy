import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> | boolean {
    //throw new Error('Method not implemented.');
    return this.testAuth().then((token:any) => { 
      console.log("token",token);
        if(token && token!==null && typeof token !=='undefined') { 
          return true ;
        }
        this.router.navigate(['/login']);
        return false ; 
    });
 
  }

  testAuth() { 
    return new Promise ((resolve,reject) => {   
      const token = localStorage.getItem("token") ; 
      resolve(token)
    });
  }
  
}
