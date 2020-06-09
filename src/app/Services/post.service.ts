import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from '../../Const/const';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  token;
  httpOptions
  constructor(private httpClient:HttpClient) {
    if(localStorage.getItem('token')!=null){
      this.token = JSON.parse(localStorage.getItem('token'));
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token.access_token}`
        })
      };
      }
   }
  postData(formData){
    return this.httpClient.post<any>(`${api}portfolio`, formData,this.httpOptions);
  }
  UploadFile(file){
    return this.httpClient.post<any>(`${api}upload`,file,this.httpOptions);
  }
  GetAll(){
    return this.httpClient.get(`${api}portfolio`);
  }
  GetById(id){
    return this.httpClient.get(`${api}userportfolio/${id}`,this.httpOptions);
  }
  GetPost(id){
    return this.httpClient.get(`${api}getportfolio/${id}`,this.httpOptions);
  }
  Update(data){
    return this.httpClient.put(`${api}portfolio`,data,this.httpOptions);
  }
  Delete(id){
    return this.httpClient.delete(`${api}portfolio/${id}`,this.httpOptions);
  }
  DeleteFile(file){
    return this.httpClient.put(`${api}delete`,file,this.httpOptions);
  }
  ValidateFiles(filenames){
    return this.httpClient.put(`${api}ValidateFiles`,filenames,this.httpOptions)
  }
  Search(data){
    return this.httpClient.post(`${api}search`,data);
  }
  GetMostValored(){
    return this.httpClient.get(`${api}mostvalored`);
  }
  GetByCategory(cat){
    return this.httpClient.get(`${api}category/${cat}`);
  }
  UpdateAuthorname(data){
    return this.httpClient.put(`${api}updatePostAuthor`,data);
  }
  
}
