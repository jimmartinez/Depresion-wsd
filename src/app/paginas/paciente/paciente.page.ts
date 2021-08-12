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
      this.menuCtrl.enable(true);
    }else{
      this.router.navigateByUrl('login');
    }
  })

}catch(e){
  this.router.navigateByUrl('login');

}
}, 5000);



  

  }
  



}
