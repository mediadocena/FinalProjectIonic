import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';
import { UserService } from 'src/app/Services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {


  constructor(private post:PostService,private user:UserService,private route: ActivatedRoute) { }
  data:any;
  index:number = undefined;
  fulldata;
  username;
  icon;
  description;
  titulos;
  _id = this.route.snapshot.paramMap.get("id");
  actualid= JSON.parse(localStorage.getItem('token'))._id.$oid
  ngOnInit() {
    if(localStorage.getItem('token') && this._id == this.actualid){
        this.username = JSON.parse(localStorage.getItem('token')).name;
        this.icon = JSON.parse(localStorage.getItem('token')).icon;
        this.description = JSON.parse(localStorage.getItem('token')).banner;
        this.titulos = JSON.parse(localStorage.getItem('token')).category; 
  }else{
      this.user.obtenerUsuarioID(this._id).subscribe((data:any)=>{
        this.username = data.name;
        this.icon = data.icon;
      })
    }
    this.ObtenerPosts();
  }
  ObtenerPosts(){
    this.post.GetById(this._id).subscribe((data:any)=>{
      this.data = data;
      this.fulldata = data;
    })
  }
  ObtenerModal(i){
    this.index=i;
  }
  Imagenes(){
    this.data = []
    this.fulldata.forEach(element => {
      if(element.category == 'Dibujo-fotografia'){
        this.data.push(element);
      }
    });
  }
  Videos(){
    this.data=[]
    this.fulldata.forEach(element => {
      if(element.category == 'Video'){
        this.data.push(element);
      }
    });
  }
  Musica(){
    this.data=[]
    this.fulldata.forEach(element => {
      if(element.category == 'Música'){
        this.data.push(element);
      }
    });
  }

  Reset(){
    this.data = this.fulldata;
  }
}
