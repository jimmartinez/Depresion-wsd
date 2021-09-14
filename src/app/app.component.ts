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


  auth.onAuthStateChanged(user=>{
    if(user){
      this.correo = user.email.toString();
    }else{
    }
  })




    
    setInterval(() => {
      this.registroService.nombreActual(this.correo).subscribe(resp=>{
        this.collectionCorreo.data = resp.map( (e:any)=>{
          return{
            nombre: e.payload.doc.data().nombre,
            idFirebase: e.payload.doc.id,
          }
        })
      },
      error=>{
        console.log(error);
      }
      );
    }, 5000);



 

    

     ////////////////////////////////////77
    if(  true ){
    this.appPages = [
        { title: 'Mi Perfil', url: '/pacienteInformacion', icon: 'person-circle' },
        { title: 'Mis encuestas', url: '/pacienteEncuestas', icon: 'mail' },
      ];
    }

  }


  
  cerrarSesion(){
    this.menuCtrl.enable(false);
    this.authService.cerrarSesion();
    this.router.navigateByUrl('login');
  }

  getNombre(){
    return this.collectionCorreo.data[0].nombre.toString();
  }

}
