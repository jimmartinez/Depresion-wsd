import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-mis-encuestas',
  templateUrl: './mis-encuestas.page.html',
  styleUrls: ['./mis-encuestas.page.scss'],
})
export class MisEncuestasPage implements OnInit {

 
  infosociodemograficaForm: FormGroup;


  constructor(
    public menuCtrl: MenuController,
    public fb: FormBuilder,
    public app: AppComponent
  ) { }

  ngOnInit() {

    this.infosociodemograficaForm = this.fb.group({
      pregunta_1: ['',Validators.required],
      pregunta_2: ['',Validators.required],
      pregunta_3: ['',Validators.required],
      pregunta_4: ['',Validators.required],
      pregunta_5: ['',Validators.required],
      pregunta_6: ['',Validators.required],
      pregunta_7: ['',Validators.required],
      pregunta_8: ['',Validators.required],
      pregunta_9: ['',Validators.required],
      pregunta_10: ['',Validators.required],
      pregunta_11: ['',Validators.required],
      pregunta_12: ['',Validators.required],
      pregunta_13: ['',Validators.required],
      pregunta_14: ['',Validators.required],
      pregunta_15: ['',Validators.required],
      pregunta_16: ['',Validators.required],
      pregunta_17: ['',Validators.required],
      pregunta_18: ['',Validators.required],
      pregunta_19: ['',Validators.required],
      pregunta_20: ['',Validators.required],
      pregunta_21: ['',Validators.required],
    })
  }

  setValue(p,newvalue) {
    this.infosociodemograficaForm.setValue({
      pregunta_1: newvalue,
      pregunta_2: 0,
      pregunta_3: 0,
      pregunta_4: 0,
      pregunta_5: 0,
      pregunta_6: 0,
      pregunta_7: 0,
      pregunta_8: 0,
      pregunta_9: 0,
      pregunta_10: 0,
      pregunta_11: 0,
      pregunta_12: 0,
      pregunta_13: 0,
      pregunta_14: 0,
      pregunta_15: 0,
      pregunta_16: 0,
      pregunta_17: 0,
      pregunta_18: 0,
      pregunta_19: 0,
      pregunta_20: 0,
      pregunta_21: 0,

    });
    }

  obtenerDesdeApp(){
    console.log(this.app.getNombre())
  }
}
