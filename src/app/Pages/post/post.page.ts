import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PostService } from 'src/app/Services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  constructor(private post:PostService,private route: ActivatedRoute,private router:Router) { 
    this.isloaded = false;

  }
  data = {
    _id
:{$oid:""},
titulo
:
"",
archivo
:
[],
texto
:
"",
autor
:
"",
authorname
:
"",
coments
:
[],
points
:
[],
category
:
"",
tags
:
[],
totalpoints
:
0,
totalcoments
:
0,
mediapoints
:
0,
authorname_lower
:
"",
titulo_lower
:
""
  };
  isloaded:boolean;
  rate;
  auth = false;
  comentario='';
  iduser;
  srcVideo;
  VideoActual;
  tituloActual;
  audios;
  audioactual;
  tituloaudioactual;
  points:any[];
  _id = this.route.snapshot.paramMap.get('id');
  images;
  ngOnInit() {
    if(localStorage.getItem("token")){
      this.auth = true;
      this.iduser = JSON.parse(localStorage.getItem('token'))._id.$oid;
    }
    this.post.GetPost(this._id).subscribe((data:any)=>{
      console.log('AAAAAAAAAAAAAAAAA',data)
      this.data = data;
      
      switch (data.category) {
        case 'Música':
          this.audios = data.archivo;
          this.audioactual = data.archivo[0].link;
          this.tituloActual = data.archivo[0].title;
          break;
          case 'Dibujo-fotografia':
           this.images = data.archivo;
           console.log(this.images)
          break;
          case 'Video':
            this.srcVideo = data.archivo;
            this.VideoActual = data.archivo[0].link;
            this.tituloActual = data.archivo[0].title;
          break;
        default:
          break;
      }
     /* if(data.category == 'Música')
        
      
      if(data.category == 'Dibujo/fotografía')
      this.galleryImages = data.archivo;

      if(data.category == 'Video'){
        this.srcVideo = data.archivo;
        this.VideoActual = data.archivo[0].link;
      }*/

      if(data.points != ""){
        this.points = data.points;
        this.points.forEach((val,index)=>{
          if(val.id == this.iduser){
            this.rate = val.rate;
          }
        })
      }else{
        this.points = [];
      }
      this.load();
    },(err)=>{
      this.router.navigate(['Home']);
    });
  }
  load(){
    this.isloaded = true;
  }
  Puntuar(){
    if(localStorage.getItem('token'))
      this.iduser = JSON.parse(localStorage.getItem('token'))._id.$oid;
    let newrate={
      'id':this.iduser,
      'rate':this.rate
    }
    this.FindPoints(this.iduser,newrate);
    this.data.points = this.points;
    console.log(this.data)
    this.post.Update(this.data).subscribe((data)=>{
      
      console.log(this.points);
      Swal.fire('¡Post puntuado!',`${newrate.rate}`,'info');
    },(err)=>{
      Swal.fire('Error',`${err}`,'error');
      console.log(err);
    })
  }

  FindPoints(iduser,newrate){
    let comentUser = false;
    this.points.forEach((val,index)=>{
      if(val.id == iduser){
        comentUser = true;
        this.points[index] = newrate;
        console.log(this.points[index])
      }
    })
    if(comentUser == false){
      this.points.push(newrate);
      console.log(this.points);
    }
  }
  Comentar(){
    if(this.comentario == '' || this.comentario == null || this.comentario == undefined){
      return false;
    }else{
      this.data.coments.push({
        "id":this.iduser,
        "coment":this.comentario,
        "icono":JSON.parse(localStorage.getItem("token")).icon,
        "name":JSON.parse(localStorage.getItem("token")).name
      })
      this.post.Update(this.data).subscribe((data)=>{
        console.log(data);
        this.comentario='';
      },(err)=>{
        console.log(err);
      })
    }
  }
  Eliminar(id){
    this.data.coments.splice(id,1);
    this.post.Update(this.data).subscribe((data)=>{
      console.log(data);
    },(err)=>{
      console.log(err);
    })
  }
  EliminarPost(){
    console.log(this.data._id.$oid)
    this.post.Delete(this.data._id.$oid).subscribe((data)=>{
      this.post.DeleteFile({'files':this.data.archivo}).subscribe((data)=>{
      })
      console.log(data);
    },(err)=>{
      console.log(err);
    })
  }

  ElimModal(){
    Swal.fire({
      title: '¿Desear eliminar el post?',
      text: "No podrás revertir el cambio",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:'no'
    }).then((result) => {
      if (result.value) {
        this.EliminarPost();
        Swal.fire(
          'Eliminado',
          'Se ha eliminado el post',
          'success'
        )
        this.router.navigate(['Home']);
      }
    })
  }

  ChangeVideo(vid){
    this.VideoActual = vid.link;
    this.tituloActual = vid.title;
  }
  ChangeAudio(aud){
    this.audioactual = aud.link;
    this.tituloaudioactual = aud.title;
  }
  AuthorPage(){
    this.router.navigate(['portfolio/'+this.data.autor])
  }
  ImageExpand(img){
    Swal.fire({
      imageUrl: img,
      imageWidth: 600,
      imageHeight: 300,
      imageAlt: 'Image',
    })
  }
}
