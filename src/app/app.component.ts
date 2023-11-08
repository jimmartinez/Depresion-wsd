import { Component, ɵɵNgOnChangesFeature } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { RegistroService } from './services/registro.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  correo: any;
  nombre: any;
  rol: any;
  collectionUsuario = {count: 20, data: []};


  
  public appPages = [
    { title: 'Cargando', url: '/', icon: 'loading' },

  ];

  public paciente = true;
  collectionCorreo = {count: 20, data: []};
  empezar = false;

  constructor(
    private auth: AngularFireAuth,
    private registroService: RegistroService,
    private authService: AuthService,
    public menuCtrl: MenuController,
    public router: Router,

  ) {




          //verifica que este autenticado o si no lo devuelve al login
    setInterval(() => {




      this.auth.onAuthStateChanged(user=>{
        if(user){
          this.correo = user.email;
        }else{
          this.router.navigateByUrl('login');
        }
      })

    
    }, 2500);



    //obtener rol de paciente si es el caso
    setInterval(() => {

      this.registroService.getInfoBasicaCorreo(this.correo).subscribe(resp=>{
        this.collectionUsuario.data = resp.map( (e:any)=>{
          return{
      
            correoPrincipal: e.payload.doc.data().correoPrincipal,
            nombre: e.payload.doc.data().nombre,

            rol: e.payload.doc.data().rol,

            
            idFirebase: e.payload.doc.id,
  
          }
        })
      },
      error=>{
        console.log(error);
      }
      );
    
    }, 2000);

    
    //obtener rol de EPS si es el caso
    setInterval(() => {
try{
  if(this.collectionUsuario.data[0].rol){
  }else{
  }
}catch(error){

  this.registroService.getEPSCorreo(this.correo).subscribe(resp=>{
    this.collectionUsuario.data = resp.map( (e:any)=>{
      return{
        sede1Nombre: e.payload.doc.data().sede1Nombre,
        correoPrincipal: e.payload.doc.data().correoPrincipal,
        rol: e.payload.doc.data().rol,
        
        idFirebase: e.payload.doc.id,

      }
    })
  },
  error=>{
    console.log(error);
  }
  );}
   
 
    
    }, 3000);

        
    //obtener rol de profesional si es el caso
    setInterval(() => {
      try{
        if(this.collectionUsuario.data[0].rol){
        }else{
        }
      }catch(error){
      
        this.registroService.getProfesionalCorreo(this.correo).subscribe(resp=>{
          this.collectionUsuario.data = resp.map( (e:any)=>{
            return{
              nombre: e.payload.doc.data().nombre,
              correoPrincipal: e.payload.doc.data().correoPrincipal,
              rol: e.payload.doc.data().rol,
              
              idFirebase: e.payload.doc.id,
      
            }
          })
        },
        error=>{
          console.log(error);
        }
        );}
         
       
          
          }, 4000);


     ////////////////////////////////////
     setInterval(() => {

      try{
        if(this.collectionUsuario.data[0].rol=='paciente'){
          this.appPages = [
            { title: 'Mi Perfil', url: '/pacienteInformacion', icon: 'person-circle' },
            { title: 'Mis Encuestas', url: '/pacienteEncuestas', icon: 'list' },
          ];
        }else{
          if (this.collectionUsuario.data[0].rol=='eps') {

            this.appPages = [
              { title: 'Perfil EPS', url: '/informacionEps', icon: 'business' },
              { title: 'Mis Profesionales', url: '/profesionales', icon: 'people' },
            ];
            
          } else {
            if (this.collectionUsuario.data[0].rol=='profesional') {
              
              this.appPages = [
                { title: 'Formularios', url: '/formularios', icon: 'list' },
                { title: 'Pacientes', url: '/pacientes', icon: 'people' },
                { title: 'Etiquetas', url: '/etiquetas', icon: 'ticket' },
                { title: 'Puntajes', url: '/puntajes', icon: 'trophy' },
                { title: 'Puntajes Android', url: '/android', icon: 'trophy' }
              ];

            } else {
            }  
          }
        }
      }catch(error){

        console.log('ocurrio algo!')
        
      }

     }, 5000);


     setInterval(() => {

      this.rol = this.collectionUsuario.data[0].rol;
      
    }, 8000);



    


  }


  
  cerrarSesion(){
    this.menuCtrl.enable(false);
    this.authService.cerrarSesion();
    this.router.navigateByUrl('login');
  }

  getNombre(){
    return this.collectionUsuario.data[0].nombre;
  }

  getNombreEPS(){
    return this.collectionUsuario.data[0].sede1Nombre;
  }

  getCorreo(){
    return this.correo;
  }

  getRol(){
    return this.rol;
  }

  correrAutenticacion(){
    this.empezar = true;
  }

}
