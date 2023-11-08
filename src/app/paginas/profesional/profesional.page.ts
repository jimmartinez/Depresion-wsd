import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.page.html',
  styleUrls: ['./profesional.page.scss'],
})
export class ProfesionalPage implements OnInit {

  constructor(    
    public router: Router,
    public menuCtrl: MenuController
    ) { }

  ngOnInit() {
  }

  irAFormularios(){


    this.router.navigateByUrl('formularios');
    this.menuCtrl.enable(true);

  }

  irAPacientes(){
    this.router.navigateByUrl('pacientes');
    this.menuCtrl.enable(true);
  }

  irAPuntajes(){

    this.router.navigateByUrl('puntajes');
    this.menuCtrl.enable(true);
    
  }

  irAPuntajesAndroid(){

    this.router.navigateByUrl('puntajes');
    this.menuCtrl.enable(true);
    
  }



}
