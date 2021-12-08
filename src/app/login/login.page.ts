import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { AppComponent } from '../app.component';
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

  collectionUsuario = {count: 20, data: []};
  collectionEPS = {count: 20, data: []};

  value = '';



  constructor(    
    public fb: FormBuilder,
    public menuCtrl: MenuController,
    public router: Router,
    private authService: AuthService,
    private registroService: RegistroService,   
    private auth: AngularFireAuth,
    private app: AppComponent 
    ) { }

  ngOnInit() {

    this.app.cerrarSesion();

    this.registroService.getEPS().subscribe(resp=>{
      this.collectionEPS.data = resp.map( (e:any)=>{
        return{
          correoPrincipal: e.payload.doc.data().correoPrincipal,
          idFirebase: e.payload.doc.id
        }
      })
    },
    error=>{
      console.log(error);
    }
    );


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
      nombreContacto: ['',Validators.required],
      telefonoContacto: ['',Validators.required],
      servicioSalud: ['',Validators.required],
      politica: ['',Validators.required],
      terminos: ['',Validators.required],
      entidadSalud: ['',Validators.required],
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
      autorizacionContacto: [false,Validators.required],
      usaReddit: [false,Validators.required],
      usuarioReddit: ['',Validators.required],
      usaInstagram: [false,Validators.required],
      usuarioInstagram: ['',Validators.required],
      usaFacebook: [false,Validators.required],
      usuarioFacebook: ['',Validators.required],
      usaTwitter: [false,Validators.required],
      usuarioTwitter: ['',Validators.required],
      usaTiktok: [false,Validators.required],
      usuarioTiktok: ['',Validators.required],
      redSocialFavorita: ['',Validators.required],

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
      usaReddit: false,
      usuarioReddit: '',
      usaInstagram: false,
      usuarioInstagram: '',
      usaFacebook: false,
      usuarioFacebook: '',
      usaTwitter: false,
      usuarioTwitter: '',
      usaTiktok: false,
      usuarioTiktok: '',
    })

    Swal.fire({
      title:'¿Estas seguro que deseas crear este usuario? '+ this.registroForm.value.correoPrincipal + ' ?',
      text:'Esta accion no se podrá deshacer',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: 'secondary',
      cancelButtonColor:'#d33',
      confirmButtonText: 'Si, Enviar!'
    }).then(result => {
      if(result.value){
        //lo que se hace si dan en aceptar

        if( this.registroForm.value.apellido1.includes(' ')||
        this.registroForm.value.apellido1.includes(' ')
        )
        {
          Swal.fire('Solo una palabra', 'al parecer introdujiste mas de un apellido en las celdas' ,'error');
          return
        }else{
          if (this.registroForm.value.apellido1.length > 45 || 
          this.registroForm.value.nombre.length > 45 ||
          this.registroForm.value.apellido2.length > 45 ||
          this.registroForm.value.lugarNacimiento.length > 45||
          this.registroForm.value.direccionResidencia.length > 45||
          this.registroForm.value.direccionLaboral.length > 45||
          this.registroForm.value.nombreContacto.length > 45||
          this.registroForm.value.telefonoContacto.length > 45||
          this.registroForm.value.servicioSalud.length > 45||
          this.registroForm.value.entidadSalud.length > 45


          ) {
            Swal.fire('Excede limite', 'Parece que excediste el limite de caracteres (45) en alguna celda ' ,'error');
            return
          } else {
            if (this.registroForm.value.estrato != 0 &&
              this.registroForm.value.estrato != 1 &&
              this.registroForm.value.estrato != 2 &&
              this.registroForm.value.estrato != 3 &&
              this.registroForm.value.estrato != 4 &&
              this.registroForm.value.estrato != 5 &&
              this.registroForm.value.estrato != 6 ) {

              Swal.fire('el valor no es correcto', 'Parece que el estrato '+ this.registroForm.value.estrato + ' no existe' ,'error');
              return
                            
            } else {
              if ((this.registroForm.value.correoPrincipal.includes('@') &&
              this.registroForm.value.correoSecundario.includes('@')) == false
                ) {

              Swal.fire('el formato de correo no es correcto', 'Recuerda que todo correo lleva una @' ,'error');
              return
                
              } else {

                if (false) {

                  Swal.fire('La contraseña no se acepta ', 'Debe contener minimo 8 caracteres ' ,'error');
                  return

                } else {

                  if (false ) {

                    Swal.fire('Las contraseñas no coinciden', 'los campos contraseña y confirmar contraseña deben ser exactamente iguales ' ,'error');
                    return
                    
                  } else {

                    if ( this.registroForm.value.telefonoContacto < 0 ||  
                         this.registroForm.value.telefonoContacto > 9999999999999
                      ) {
        
                    Swal.fire('el telefono esta fuera del rango', ' el numero no parece estar correcto ' ,'error');
                    return
                      
                    } else {

                      if ( (this.registroForm.value.terminos && this.registroForm.value.politica) != true ) {

                        Swal.fire('Debes leer y aceptar ', ' La politica de tratamiento de datos habeas data y terminos y condiciones ' ,'error');
                        return
                        
                      } else {
                        
                        if (this.registroForm.value.nombre == '' ||
                            this.registroForm.value.apellido1 == ''||
                            this.registroForm.value.apellido2 == ''||
                            this.registroForm.value.fechaNacimiento == ''||
                            this.registroForm.value.lugarNacimiento == ''||
                            this.registroForm.value.genero == ''||
                            this.registroForm.value.orientacionSexual == ''||
                            this.registroForm.value.direccionResidencia == ''||
                            this.registroForm.value.direccionLaboral == ''||
                            this.registroForm.value.estrato == ''||
                            this.registroForm.value.correoPrincipal == ''||
                            this.registroForm.value.correoSecundario == ''||
                            this.registroForm.value.nombreContacto == ''||
                            this.registroForm.value.telefonoContacto == ''||
                            this.registroForm.value.servicioSalud == ''||
                            this.registroForm.value.entidadSalud == ''

                         ) {

                          Swal.fire(' Campos vacios ', ' No deben quedar campos vacios' ,'error');
                          return
                          
                        } else {


                          
                        }
                        
                      }
                      
                    }

  
                    
                  }
                  
                }
                
              }
              
            }
            
          }


          
          this.authService.crearUsuario(this.registroForm.value.correoPrincipal,'12345678');


          var created = false;

    
Swal.fire({
  position: 'center',
  icon: 'warning',
  title: 'Un momento por favor',
  showConfirmButton: false,
  timer: 5000
})


this.auth.onAuthStateChanged(user=>{
  if(user){

    created = true;
    

  }else{
    created = false;

  }
})


  setTimeout(() => {

    if (created == true) {




      this.registroService.createInfoBasica(this.registroForm.value).then(resp=>{

      }).catch(error => {
        console.log('error'); 
      })
  
        
  
      this.registroService.createInfoSociodemografica(this.socioForm.value).then(resp=>{
        document.getElementById('registroPaciente').style.display='none';
        this.router.navigateByUrl('paciente');
      }).catch(error => {
        console.log('error'); 
      })


      this.authService.cambiarContra(this.registroForm.value.correoPrincipal);


      Swal.fire('El usuario fue creado con contraseña 12345678, te enviamos un correo para que reasignes tu contraseña por seguridad: ' + this.registroForm.value.correoPrincipal , this.registroForm.value.correoPrincipal ,'success');


  
  
      
    }else{

      if (created == false) {

        Swal.fire('Ingreso Denegado', 'este correo ya esta registrado' ,'error');
        return
      }

    }
  }, 5000);

        }
   

      }
    })
    return 
   




    
  }

  registrarEPS(){
    Swal.fire({
      title:'¿Estas seguro que deseas crear este usuario de EPS?',
      text:'Esta accion no se podrá deshacer',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: 'secondary',
      cancelButtonColor:'#d33',
      confirmButtonText: 'Si, Crear!'
    }).then(result => {
      if(result.value){
        //lo que va despues de hacer clic en aceptar
        if ( this.registroEPSForm.value.nit.length != 11  ) {

          Swal.fire('Formato de Nit invalido!', ' Ejemplo: 800900234-3 ','error');
          return 
          
        } else {

          if (this.registroEPSForm.value.idAdministrador < 1 ||
            this.registroEPSForm.value.idAdministrador > 9999999999
             ) {

              Swal.fire('Identificacion del administrador invalida!', ' la identificacion esta fuera del rango  ','error');
              return 
              
            
          } else {
            
            if ((this.registroEPSForm.value.correoPrincipal.includes('@')&&
            this.registroEPSForm.value.correoSecundario.includes('@'))
             == false) {

              Swal.fire('formato de correo invalido!', ' Ejemplo capitolioepsnueva@hotmail.com ','error');
              return 

            } else {

              if ((this.registroEPSForm.value.terminos && this.registroEPSForm.value.politica) != true) {

                Swal.fire('Debes leer y aceptar ', ' La politica de tratamiento de datos habeas data y terminos y condiciones ' ,'error');
                return          
                
              } else {

                if (false ) {

                  Swal.fire('Las contraseñas no coinciden', 'los campos contraseña y confirmar contraseña deben ser exactamente iguales ' ,'error');
                  return
                  
                } else {


                  if (false) {

                    Swal.fire('La contraseña no se acepta ', 'Debe contener minimo 8 caracteres ' ,'error');
                    return
                    
                  } else {

                    if (this.registroEPSForm.value.sede1Tel<=0||
                      this.registroEPSForm.value.sede1Tel>9999999999||
                      this.registroEPSForm.value.sede2Tel<0||
                      this.registroEPSForm.value.sede2Tel>9999999999||
                      this.registroEPSForm.value.sede3Tel<0||
                      this.registroEPSForm.value.sede3Tel>9999999999

                      
                      ) {

                        Swal.fire('Campos de telefono no validos ', 'Esta fuera de los rangos  ' ,'error');
                        return
                      
                    } else {

                      if (
                        this.registroEPSForm.value.nit == ''||
                        this.registroEPSForm.value.nombreAdmin == ''||
                        this.registroEPSForm.value.sede1Nombre == ''||
                        this.registroEPSForm.value.sede1Pag == ''||
                        this.registroEPSForm.value.correoPrincipal == ''||
                        this.registroEPSForm.value.correoSecundario == ''
                        
                      ) {

                        Swal.fire('Campos obligatorioss ', 'Nit, Administrador, Datos de una sede y correos  ' ,'error');



                        
                        
                      } else {
                        
                      }


                      
                      
                    }



                    
                  }
                }
              }   
            }
          }
          
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////
this.authService.crearUsuario(this.registroEPSForm.value.correoPrincipal,'12345678');

var creat = false;

    
Swal.fire({
  position: 'center',
  icon: 'warning',
  title: 'Un momento por favor',
  showConfirmButton: false,
  timer: 5000
})



this.auth.onAuthStateChanged(user=>{
  if(user){

    creat = true;
    

  }else{
    creat = false;

  }
})



setTimeout(() => {

  if (creat == true) {




    this.registroService.createEPS(this.registroEPSForm.value).then(resp=>{

      document.getElementById('registroEPS').style.display='none';
      this.router.navigateByUrl('direccionamiento');

    }).catch(error => {
      console.log('error'); 
    })

    this.authService.cambiarContra(this.registroEPSForm.value.correoPrincipal);

    Swal.fire('El usuario fue creado con contraseña 12345678, te enviamos un correo para que reasignes tu contraseña por seguridad: ' + this.registroEPSForm.value.correoPrincipal , this.registroEPSForm.value.correoPrincipal ,'success');

    
  }else{

    if (creat == false) {

      Swal.fire('Ingreso Denegado', 'Este correo ya esta registrado' ,'error');
      return
    }

  }
}, 5000);





  }
    })
    return 
   

  }





  iniciarSesionEPS(){
    try{
      this.authService.iniciarSesion(this.loginForm.value.nombre,this.loginForm.value.contra);
      this.router.navigateByUrl('eps');
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

    Swal.fire({
      title:'¿Estas seguro que deseas enviar un correo de recuperacion al correo '+ this.loginForm.value.nombre + ' ?',
      text:'Esta accion no se podrá deshacer',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: 'secondary',
      cancelButtonColor:'#d33',
      confirmButtonText: 'Si, Enviar!'
    }).then(result => {
      if(result.value){
        //lo que se hace
           this.authService.cambiarContra(this.loginForm.value.nombre);
   
    Swal.fire('Correo de recuperación enviado a', this.loginForm.value.nombre ,'success');
      }
    })
    return 
   


  }


  iniciarSesion(){


   this.authService.iniciarSesion(this.loginForm.value.nombre,this.loginForm.value.contra);


   var creado = false;

    
Swal.fire({
  position: 'center',
  icon: 'warning',
  title: 'Un momento por favor',
  showConfirmButton: false,
  timer: 5000
})


   this.auth.onAuthStateChanged(user=>{

    console.log(user);
    if(user){

      creado = true;
      this.app.correrAutenticacion();
      

    }else{
      creado = false;

    }
  })


  setTimeout(() => {

    if (creado == true) {

      Swal.fire('Ingreso Correcto', 'Bienvenido' ,'success');
      this.router.navigateByUrl('direccionamiento');

      
      
    }else{

      if (creado == false) {

        Swal.fire('Ingreso Denegado', 'Comprueba tu correo y contraseña' ,'error');
        
      }

    }
  }, 3000);


  }


  prueba(){
    console.log('dyrt')

  }

  onEnter(value: string) { this.value = value; }

  



}
