import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/Services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { api } from 'src/Const/const';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File,IWriteOptions,FileEntry} from '@ionic-native/file/ngx'
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  uploadService: any;

  constructor(private file:File,private user:UserService,private formBuilder:FormBuilder,private camera: Camera) { 
  }
  data;
  uploadForm:FormGroup;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  ngOnInit() {
    this.GetAll();
    this.uploadForm = this.formBuilder.group({
      file: [''],
      filename: this.data._id.$oid
    });
  }

  GetAll(){
    this.data = JSON.parse(localStorage.getItem('token'));
  }
  async CambiarNick(){
    const { value: nick } = await Swal.fire({
      title: 'Introduzca su nuevo nick',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Introduzca un nick'
        }
      }
    })

    if (nick) {
      this.data.name = nick;
      this.user.Update(this.data).subscribe((data)=>{
        localStorage.setItem('token',JSON.stringify(this.data));
        Swal.fire(`Tu nuevo nick es: ${nick}`,'success');
      },(err)=>{
        Swal.fire('Eror al cambiar nick','error');
      })
      
    }
  }
  CambiarContrasena(){
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Siguiente &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Nueva contraseña',
        text: 'Introduzca la nueva contraseña'
      },
      'Repita la contraseña'
    ]).then((result) => {
      if (result.value) {
        if (result.value[0] == result.value[1]){
          this.data.password = result.value[0];
          console.log(this.data.password);
          this.user.Update(this.data).subscribe((data)=>{
            Swal.fire({
              icon:'success',
              title: '¡Hecho!',
              html: `
                Tu contraseña se ha cambiado
              `,
              confirmButtonText: 'Aceptar'
            })
          },(err)=>{
            Swal.fire({
              icon:'error',
              title: 'Ha ocurrido un error',
              html: `
                Tu contraseña no ha sido modificada
              `,
              confirmButtonText: 'Aceptar'
            })
          })
      }else{
        Swal.fire({
          icon:'error',
          title: 'Ha ocurrido un error',
          html: `
            Asegurate de que las contraseñas son iguales
          `,
          confirmButtonText: 'Aceptar'
        })
      }
      }
    })
  }
  readFile(file: any) {
      
      alert(file)
      let formData = {
        "file":file,
        "filename":this.data._id.$oid
      }
      alert(formData.file)
      alert(formData.filename)
      this.user.UploadUserImg(formData).subscribe((data) => {
        this.data.icon = `${api}download/${this.data._id.$oid}`
        localStorage.setItem('token',JSON.stringify(this.data));
      },(err)=>{
        alert('error'+err.error.msg)
        alert('error'+err.error.error)
      });
  

  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.readFile(imageData);
    }, (err) => {
      alert('Error')
    });
  }

  BorrarImg(){
    let name = this.data.icon.substr(this.data.icon.lastIndexOf('/') + 1)
    console.log(name)
    this.user.BorrarImg(name).subscribe();
  }
}
