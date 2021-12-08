import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-eps',
  templateUrl: './eps.page.html',
  styleUrls: ['./eps.page.scss'],
})
export class EpsPage implements OnInit {

  constructor(
    private appComponent: AppComponent,
    public router: Router,
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
  }

  irAPerfil(){


    this.router.navigateByUrl('informacionEps');
    this.menuCtrl.enable(true);

  }

  irAProfesionales(){
    this.router.navigateByUrl('profesionales');
    this.menuCtrl.enable(true);
  }

  salir(){

    this.appComponent.cerrarSesion();
    
  }
}
