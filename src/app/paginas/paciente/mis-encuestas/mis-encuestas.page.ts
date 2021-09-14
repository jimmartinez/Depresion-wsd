import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-mis-encuestas',
  templateUrl: './mis-encuestas.page.html',
  styleUrls: ['./mis-encuestas.page.scss'],
})
export class MisEncuestasPage implements OnInit {

  @ViewChild('slides') slides: IonSlides;



  mostrarBasica = true;
  mostrarSocio = false;

  infosociodemograficaForm: FormGroup;


  constructor(
    public menuCtrl: MenuController,
    public fb: FormBuilder
  ) { }

  ngOnInit() {

    this.infosociodemograficaForm = this.fb.group({
      trabaja: ['',Validators.required],
      trabajoRelacionado: ['',Validators.required],
      motivoTrabajo: ['',Validators.required],
      campoTrabajo: ['',Validators.required],
      empleado: ['',Validators.required],
      tipoEmpresa: ['',Validators.required],
      horasTrabajo: ['',Validators.required],
      estadoCivil: ['',Validators.required],
      conQuienVive: ['',Validators.required],
      tipoVivienda: ['',Validators.required],
      tipoRedSocial: ['',Validators.required],
      redSocialFavorita: ['',Validators.required],
      autorizacionContacto: ['',Validators.required]
    })
  }


  slideChanged() { 
    if(this.mostrarBasica == true){
      this.mostrarBasica = false;
      this.mostrarSocio = true;
    }else{
      this.mostrarBasica = true;
      this.mostrarSocio = false;
    }

  }


  goToBasica() {
    this.slides.slideTo(0);
  }

  goToSocio() {
    this.slides.slideTo(1);
  }


  

}
