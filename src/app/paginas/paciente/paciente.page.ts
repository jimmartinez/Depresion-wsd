import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    public router: Router,
    public menuCtrl: MenuController,
  ) { }

  emailUsuario: string;

  ngOnInit() {

    this.menuCtrl.enable(true);

    this.auth.onAuthStateChanged(user=>{
      if(user){
        this.router.navigateByUrl('paciente');
        this.emailUsuario = user.email;
      }else{
        this.router.navigateByUrl('login');
      }
    })

  

  }
  
  obtenerCorreo(){

    console.log(this.emailUsuario);
  }


}
