import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { RegistroService } from '../services/registro.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  registroForm: FormGroup;

  constructor(    
    public fb: FormBuilder,
    public menuCtrl: MenuController,
    private authService: AuthService,
    private registroService: RegistroService,
    ) { }

  ngOnInit() {

    this.menuCtrl.enable(false);

    this.loginForm = this.fb.group({
      nombre: ['',Validators.required],
      contra: ['',Validators.required],
    })

    this.registroForm = this.fb.group({
      
      nombre: ['',Validators.required],
      apellido1: ['',Validators.required],
      apellido2: ['',Validators.required],
      fechaNacimiento: ['',Validators.required],
      lugarNacimiento: ['',Validators.required],
      genero: ['',Validators.required],
      orientacionSexual: ['',Validators.required],
      direccionResidencia: ['',Validators.required],
      direccionLaboral: ['',Validators.required],
      estrato: ['',Validators.required],
      correoPrincipal: ['',Validators.required],
      correoSecundario: ['',Validators.required],
      contra: ['',Validators.required],
      confirmaContra: ['',Validators.required],
      nombreContacto: ['',Validators.required],
      telefonoContacto: ['',Validators.required],
      servicioSalud: ['',Validators.required],
      politica: ['',Validators.required],
      terminos: ['',Validators.required],

    })

    document.getElementById('id01').style.display='block';
  
  }

  registrar(){
    this.authService.crearUsuario(this.registroForm.value.correoPrincipal,this.registroForm.value.contra);
    this.registroService.createInfoBasica(this.registroForm.value).then(resp=>{

    }).catch(error => {
      console.log('error'); 
    })
  }


  cerrarSesion(){
    this.authService.cerrarSesion();
  }

  iniciarSesion(){
    this.authService.iniciarSesion(this.loginForm.value.nombre,this.loginForm.value.contra);
  }

  regToIn(){
    document.getElementById('id01').style.display='none';
    document.getElementById('id02').style.display='block';
  }

  inToReg(){
    document.getElementById('id01').style.display='block';
    document.getElementById('id02').style.display='none';
  }



}
