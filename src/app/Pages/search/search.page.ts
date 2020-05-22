import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  
  constructor(private post:PostService) { }
  searchArgs;
  filter = '';
  data = [];

  ngOnInit() {

  }

  Buscar(){
    let searchdata={
      'args':this.searchArgs,
      'filt':this.filter
    }
    console.log(this.filter);
    let dat;
    this.post.Search(searchdata).subscribe((data:any)=>{
      dat = data;
      this.data = dat;
      console.log(data);
      
    })

  }
}
