import { Component } from '@angular/core';
import { PostService } from '../Services/post.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private post:PostService, private navCtrl:NavController) { }

  data:any[]; 
  fulldata:any[];
  searchArgs:string;
  ngOnInit() {
    this.ObtenerPosts();
    
  }

  ObtenerPosts(){
    this.post.GetMostValored().subscribe((data:any)=>{
      this.data = data;
      console.log(this.data)
      this.fulldata = data; 
    })
  }
  Buscar(searchArgs:string){
    if(searchArgs == '' || searchArgs == undefined || searchArgs == null){
      this.data = this.fulldata;
    }else{
      this.data = [];
      var BreakException = {};
      this.fulldata.forEach((dat:any) => {
        if(dat.tags){
          try{
          dat.tags.forEach(element => {
            if(element.toLowerCase().search(this.searchArgs.toLowerCase()) != -1){
              this.data.push(dat);
              throw BreakException;
            }
          });
          }catch(e){
            if (e !== BreakException) throw e;
          }
        }
        if (dat.titulo.toLowerCase().search(this.searchArgs.toLowerCase()) != -1 ||
          dat.autor.toLowerCase().search(this.searchArgs.toLowerCase()) != -1) {
          this.data.push(dat);
        }
      })
    }
  }
  navigate(){
    window.location.reload();
  }

}
