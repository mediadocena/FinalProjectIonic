import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private user:UserService,private router:Router) { }
  email:string;
  password:string;
  password2:string;
  username:string;
  ngOnInit() {
    if(localStorage.getItem('token')){
      this.router.navigate(['/Home']);
    }
  }
  signIn(){
    if(this.email == '' || this. password == '' || this.password2 == '' || this.username == '' || this.email == undefined){
      console.log(this.email)
      console.log(this.password)
      return Swal.fire('Error','Debe de rellenar todos los campos','error');
    }
    if(this.password==this.password2){
      if(this.password.length<8){
        return Swal.fire('Error','La contraseña debe tener minimo 8 caracteres','error');
      }
      let data = {
        'mail':this.email,
        'password':this.password,
        'username':this.username,
        'icono':'https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_960_720.png',
        'rol':'user'
      }
      console.log(data)
      this.user.Post(data).subscribe((dat)=>{
        Swal.fire('Registrado con éxito',
        'Revise su correo electrónico para activar la cuenta',
        'success');
        this.router.navigate(['/login'])
      },(err)=>{
        console.log(err)
        Swal.fire('Error',err.error.msg,'error');
      })
    }
  }
}
