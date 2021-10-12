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
  collectionUsuario = {count: 20, data: []};


  
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  public paciente = true;
  collectionCorreo = {count: 20, data: []};
  

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
    }, 1000);



    //obtener rol de paciente si es el caso
    setInterval(() => {

      this.registroService.getInfoBasicaCorreo(this.correo).subscribe(resp=>{
        this.collectionUsuario.data = resp.map( (e:any)=>{
          return{
      
            correoPrincipal: e.payload.doc.data().correoPrincipal,
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

        
    //obtener rol de EPS si es el caso
    setInterval(() => {
      try{
        if(this.collectionUsuario.data[0].rol){
        }else{
        }
      }catch(error){
      
        this.registroService.getProfesionalCorreo(this.correo).subscribe(resp=>{
          this.collectionUsuario.data = resp.map( (e:any)=>{
            return{
        
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
                { title: 'Etiquetas', url: '/etiquetas', icon: 'ticket' }
              ];

            } else {
            }  
          }
        }
      }catch(error){
        
      }

     }, 5000);


  }


  
  cerrarSesion(){
    this.menuCtrl.enable(false);
    this.authService.cerrarSesion();
    this.router.navigateByUrl('login');
  }

  getNombre(){
    return this.collectionUsuario.data[0].rol.toString();
  }

  getCorreo(){
    return this.correo;
  }

}
