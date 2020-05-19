import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from '../../Const/const';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token; 
  httpOptions;
  constructor(private http:HttpClient){
    if(JSON.parse(localStorage.getItem('token'))){
      this.token = JSON.parse(localStorage.getItem('token')).access_token;
    }else{
      this.token = ''
    }
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
  }
  public login(email,password){
    let data = {'mail':email,'password':password}
    return this.http.post(`${api}login`,data);
  }
  public obtenerUsuarioID(id){
    return this.http.get(`${api}userById/`+id)
  }
  public ObtenerUsuarios(){
    return this.http.get(`${api}user`,this.httpOptions)
  }
  public Delog(){
    return this.http.delete(`${api}logout`,this.httpOptions);
  }
  public Post(data){
    return this.http.post(`${api}postuser`,data);
  }
  public Confirm(id){
    return this.http.get(`${api}Confirm/`+id);
  }
  public Update(data){
    return this.http.put(`${api}user`,data,this.httpOptions);
  }
  public UpdateIcon(data){
    return this.http.put(`${api}changeicon`,data,this.httpOptions);
  }
  public Upload(form){
    return this.http.post<any>(`${api}upload`,form,this.httpOptions);
  }
  public BorrarImg(name){
    return this.http.delete(`${api}delete/${name}`);
  }
  public UploadUserImg(form){
    return this.http.post(`${api}UploadUserImg`,form,this.httpOptions);
  }
  public Eliminar(id){
    return this.http.delete(`${api}user/${id}`);
  }
}
