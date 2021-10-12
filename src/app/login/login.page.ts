import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  registroEPSForm: FormGroup;
  socioForm: FormGroup;

  constructor(    
    public fb: FormBuilder,
    public menuCtrl: MenuController,
    public router: Router,
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
      rol: ['paciente',Validators.required],

    })

    this.registroEPSForm = this.fb.group({

      nit: ['',Validators.required],
      idAdministrador: ['',Validators.required],
      nombreAdmin: ['',Validators.required],
      sede1Nombre: ['',Validators.required],
      sede1Tel: ['',Validators.required],
      sede1Pag: ['',Validators.required],
      sede1Dir: ['',Validators.required],
      sede2Nombre: ['',Validators.required],
      sede2Tel: ['',Validators.required],
      sede2Pag: ['',Validators.required],
      sede2Dir: ['',Validators.required],
      sede3Nombre: ['',Validators.required],
      sede3Tel: ['',Validators.required],
      sede3Pag: ['',Validators.required],
      sede3Dir: ['',Validators.required],
      correoPrincipal: ['',Validators.required],
      correoSecundario: ['',Validators.required],
      contra: ['',Validators.required],
      confirmaContra: ['',Validators.required],
      politica: ['',Validators.required],
      terminos: ['',Validators.required],
      rol: ['eps',Validators.required],

    })


    this.socioForm = this.fb.group({

      correoPrincipal: ['',Validators.required],
      trabaja: ['',Validators.required],
      trabajoRelacionado: ['',Validators.required],
      motivoTrabajo: ['',Validators.required],
      campoTrabajo: ['',Validators.required],
      empleado: ['',Validators.required],
      horasTrabajo: ['',Validators.required],
      tipoEmpresa: ['',Validators.required],
      estadoCivil: ['',Validators.required],
      conQuienVive: ['',Validators.required],
      tipoVivienda: ['',Validators.required],
      tipoRedSocial: ['',Validators.required],
      redSocialFavorita: ['',Validators.required],
      autorizacionContacto: ['paciente',Validators.required]
      

    })



    document.getElementById('login').style.display='block';
  
  }

  registrar(){

    this.socioForm.setValue({
      correoPrincipal: this.registroForm.value.correoPrincipal,
      trabaja: '',
      trabajoRelacionado: '',
      motivoTrabajo: '',
      campoTrabajo: '',
      empleado: '',
      tipoEmpresa: '',
      horasTrabajo: '',
      estadoCivil: '',
      conQuienVive: '',
      tipoVivienda: '',
      tipoRedSocial: '',
      redSocialFavorita: '',
      autorizacionContacto: '',
    })



    this.registroService.createInfoBasica(this.registroForm.value).then(resp=>{
      this.authService.crearUsuario(this.registroForm.value.correoPrincipal,this.registroForm.value.contra);
    }).catch(error => {
      console.log('error'); 
    })


    this.registroService.createInfoSociodemografica(this.socioForm.value).then(resp=>{
      document.getElementById('registroPaciente').style.display='none';
      this.router.navigateByUrl('paciente');
    }).catch(error => {
      console.log('error'); 
    })
    
  }

  registrarEPS(){

    this.registroService.createEPS(this.registroEPSForm.value).then(resp=>{
      this.authService.crearUsuario(this.registroEPSForm.value.correoPrincipal,this.registroEPSForm.value.contra);
      document.getElementById('registroEPS').style.display='none';
      this.router.navigateByUrl('eps');
    }).catch(error => {
      console.log('error'); 
    })
    
  }


  cerrarSesion(){
    this.authService.cerrarSesion();
  }

  iniciarSesion(){
    try{
      this.authService.iniciarSesion(this.loginForm.value.nombre,this.loginForm.value.contra);
      this.router.navigateByUrl('direccionamiento');
      this.menuCtrl.enable(true);
    }catch(error){
      this.router.navigateByUrl('login');
      this.menuCtrl.enable(false);
    }
    
  }

  iniciarSesionEPS(){
    try{
      this.authService.iniciarSesion(this.loginForm.value.nombre,this.loginForm.value.contra);
      this.router.navigateByUrl('eps');
      this.menuCtrl.enable(true);
    }catch(error){
      this.router.navigateByUrl('login');
      this.menuCtrl.enable(false);
    }
    

  }



  regToIn(){
    document.getElementById('registroPaciente').style.display='none';
    document.getElementById('login').style.display='block';
  }

  inToReg(){
    document.getElementById('login').style.display='none';
    document.getElementById('registroPaciente').style.display='block';
  }

  regToEPS(){
    document.getElementById('registroPaciente').style.display='none';
    document.getElementById('registroEPS').style.display='block';
  }

  EPSToReg(){
    document.getElementById('registroEPS').style.display='none';
    document.getElementById('registroPaciente').style.display='block';
  }

  EPSToIn(){
    document.getElementById('registroEPS').style.display='none';
    document.getElementById('login').style.display='block';
  }


  cambiarContra(){

    this.authService.cambiarContra(this.loginForm.value.nombre);

  }



}
