import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';




@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private appComponent: AppComponent,
    public router: Router,
    public menuCtrl: MenuController,

  ) { }

  emailUsuario: string;
  

  ngOnInit() {


    setInterval(() => {
try{
  this.auth.onAuthStateChanged(user=>{
    if(user){
      this.emailUsuario = user.email;    
    }else{
      this.router.navigateByUrl('login');
      this.menuCtrl.enable(false);
    }
  })

}catch(e){
  this.router.navigateByUrl('login');

}
}, 5000);



  }


  irAPerfil(){
    this.router.navigateByUrl('pacienteInformacion');
    this.menuCtrl.enable(true);

  }

  irAEncuestas(){
    this.router.navigateByUrl('pacienteEncuestas');
    this.menuCtrl.enable(true);
  }

  salir(){

    this.appComponent.cerrarSesion();
    
  }

  


  



}


