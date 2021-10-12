import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.page.html',
  styleUrls: ['./formularios.page.scss'],
})
export class FormulariosPage implements OnInit {


  collectionFormularios = {count: 20, data: []};


  formularioForm: FormGroup;


  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    
    this.formularioForm = this.fb.group({

      nombre: ['',Validators.required],
      cantidadOpciones: ['',Validators.required],

    })


  }



}
