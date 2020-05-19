import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  constructor() {}
  
  public isAuthenticated(): boolean {
    if (localStorage.getItem('token') != null) {
      const token = JSON.parse(localStorage.getItem('token'));
    //Fecha de creación del token (UTF)
    let fecha = new Date(JSON.stringify(token.exp));
    let hoy:Date = new Date();
    console.log('HOY: '+hoy)
    if(hoy > fecha){
      console.log('token caducado');
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      return false;
    }else{
      console.log('token dentro de fecha');
      return true;
    }
    } else {
      return false;
    }
  }
}