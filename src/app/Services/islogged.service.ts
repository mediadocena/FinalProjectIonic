import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsloggedService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    let bol:boolean = false;
    let token:any = JSON.parse(localStorage.getItem('token'));
    //Comprobamos si existe token en local:
    if(token != null){
      if (this.auth.isAuthenticated()) {
        if("false" == token.verified){
          this.router.navigate(['/notverified']);
          bol=true
        }else{
          bol = true;
        }
      }
      bol = true;
    }else{
      this.router.navigate(['/login']);
      bol = false;
    }
  return bol;
}
}