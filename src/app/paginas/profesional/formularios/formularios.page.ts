import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.page.html',
  styleUrls: ['./formularios.page.scss'],
})
export class FormulariosPage implements OnInit {


  collectionFormularios = {count: 20, data: []};


  formularioForm: FormGroup;

  actualizar: boolean;



  constructor(
    public fb: FormBuilder,
    private registroService: RegistroService
  ) { }

  ngOnInit() {
    
    this.formularioForm = this.fb.group({

      nombre: ['',Validators.required],
      cantidadOpciones: ['',Validators.required],
      prueba: ['',Validators.required],



    })


  }

  abrirModal(){
    /*  //llenar el form
      this.profesionalForm.setValue({
        nombre: '',
        documento: 0,
        tipoDoc: '',
        especialidad: '',
        tarjetaProfesional: '',
        tipoContrato: '',
        practicante: false,
        correoPrincipal: '',
        entidadDeSalud: this.appComponent.getCorreo(),
        rol: 'profesional'
      });
    */
        this.actualizar = false;
        //abrir modal
        document.getElementById('creacionFormulario').style.display='block';
  
  }

  crearFormularioLikert(){

    
    this.registroService.createFormulario(this.formularioForm.value).then(resp=>{
    }).catch(error => {
      console.log('error'); 
    })

    document.getElementById('creacionFormulario').style.display='none';

  }



}
