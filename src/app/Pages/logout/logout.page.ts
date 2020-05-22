import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private user:UserService,private router:Router) { }

  ngOnInit() {
    this.user.Delog().subscribe((data)=>{
      console.log('logout')
      localStorage.removeItem('token');
      window.location.reload();
    });
  }

}
