import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/Services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { api } from 'src/Const/const';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private user:UserService,private formBuilder:FormBuilder) { 
  }
  data;
  uploadForm:FormGroup;
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
  async onFileSelect(){
    const { value: file } = await Swal.fire({
      title: 'Seleccione una imagen:',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Subir tu nuevo icono:'
      }
    })
    if (file) {
      const formdata = new FormData();
      const reader = new FileReader();
      this.uploadForm.get('file').setValue(file);
      formdata.append('file',this.uploadForm.get('file').value);
      formdata.append('filename',this.uploadForm.get('filename').value);
      //this.BorrarImg();
      this.user.UploadUserImg(formdata).subscribe((data)=>{
        //this.data.icon = `${api}download/${this.data._id.$oid}.${file.name.substr(file.name.lastIndexOf('.') + 1)}`;
        this.data.icon = `${api}download/${this.data._id.$oid}`
        localStorage.setItem('token',JSON.stringify(this.data));
        this.user.UpdateIcon(this.data).subscribe((data)=>{
          reader.onload = (e:any) => {
            Swal.fire({
              title: 'Tu nuevo icono',
              imageUrl: e.target.result,
              imageAlt: 'Tu nuevo icono'
            })
          }
          reader.readAsDataURL(file)
        },(err)=>{
          Swal.fire({
            icon:'error',
            title:'Error al modificar icono',
            html:`${err}`,
            confirmButtonText:'Aceptar'
          })
        })
      },(err)=>{
        Swal.fire({
          icon:'error',
          title:'Error al subir icono',
          html:`${err}`,
          confirmButtonText:'Aceptar'
        })
      });
    }
  }
  BorrarImg(){
    let name = this.data.icon.substr(this.data.icon.lastIndexOf('/') + 1)
    console.log(name)
    this.user.BorrarImg(name).subscribe();
  }
}
