import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/services/registro.service';
import { AppComponent } from 'src/app/app.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.page.html',
  styleUrls: ['./formularios.page.scss'],
})
export class FormulariosPage implements OnInit {


  collectionFormularios = {count: 20, data: []};

  collectionEtiquetas = {count: 20, data: []};

  mostrarPregunta= {};
  mostrarEnunciadoOpcion= {};

  idFirebaseActualizar: string;

  nombreProfesional ='cargando';



  formularioForm: FormGroup;

  actualizar: boolean;



  constructor(
    public fb: FormBuilder,
    private registroService: RegistroService,
    public app: AppComponent

  ) { }

  ngOnInit() {

    setInterval(() => {
      this.nombreProfesional = this.app.getNombre();
    }, 1000);

    this.mostrarPregunta[0]=false;
    
    this.formularioForm = this.fb.group({

      nombre: ['',Validators.required],


      //es un tope maximo de 6 es decir 0 a 5
      cantidadOpciones: ['',Validators.required],
      instrucciones: ['',Validators.required],
      linkImagen: ['',Validators.required],

      enunciadoOpcion0: ['',Validators.required],
      enunciadoOpcion1: ['',Validators.required],
      enunciadoOpcion2: ['',Validators.required],
      enunciadoOpcion3: ['',Validators.required],
      enunciadoOpcion4: ['',Validators.required],
      enunciadoOpcion5: ['',Validators.required],


      cantidadPreguntas: [1,Validators.required],

//sera un tope maximo de 40 preguntas

      pregunta1: ['',Validators.required],
      categoria1: ['',Validators.required],
      pregunta2: ['',Validators.required],
      categoria2: ['',Validators.required],
      pregunta3: ['',Validators.required],
      categoria3: ['',Validators.required],
      pregunta4: ['',Validators.required],
      categoria4: ['',Validators.required],
      pregunta5: ['',Validators.required],
      categoria5: ['',Validators.required],
      pregunta6: ['',Validators.required],
      categoria6: ['',Validators.required],
      pregunta7: ['',Validators.required],
      categoria7: ['',Validators.required],
      pregunta8: ['',Validators.required],
      categoria8: ['',Validators.required],
      pregunta9: ['',Validators.required],
      categoria9: ['',Validators.required],
      pregunta10: ['',Validators.required],
      categoria10: ['',Validators.required],
      pregunta11: ['',Validators.required],
      categoria11: ['',Validators.required],
      pregunta12: ['',Validators.required],
      categoria12: ['',Validators.required],
      pregunta13: ['',Validators.required],
      categoria13: ['',Validators.required],
      pregunta14: ['',Validators.required],
      categoria14: ['',Validators.required],
      pregunta15: ['',Validators.required],
      categoria15: ['',Validators.required],
      pregunta16: ['',Validators.required],
      categoria16: ['',Validators.required],
      pregunta17: ['',Validators.required],
      categoria17: ['',Validators.required],
      pregunta18: ['',Validators.required],
      categoria18: ['',Validators.required],
      pregunta19: ['',Validators.required],
      categoria19: ['',Validators.required],
      pregunta20: ['',Validators.required],
      categoria20: ['',Validators.required],
      pregunta21: ['',Validators.required],
      categoria21: ['',Validators.required],
      pregunta22: ['',Validators.required],
      categoria22: ['',Validators.required],
      pregunta23: ['',Validators.required],
      categoria23: ['',Validators.required],
      pregunta24: ['',Validators.required],
      categoria24: ['',Validators.required],      
      pregunta25: ['',Validators.required],
      categoria25: ['',Validators.required],
      pregunta26: ['',Validators.required],
      categoria26: ['',Validators.required],
      pregunta27: ['',Validators.required],
      categoria27: ['',Validators.required],
      pregunta28: ['',Validators.required],
      categoria28: ['',Validators.required],
      pregunta29: ['',Validators.required],
      categoria29: ['',Validators.required],
      pregunta30: ['',Validators.required],
      categoria30: ['',Validators.required],
      pregunta31: ['',Validators.required],
      categoria31: ['',Validators.required],
      pregunta32: ['',Validators.required],
      categoria32: ['',Validators.required],
      pregunta33: ['',Validators.required],
      categoria33: ['',Validators.required],
      pregunta34: ['',Validators.required],
      categoria34: ['',Validators.required],
      pregunta35: ['',Validators.required],
      categoria35: ['',Validators.required],
      pregunta36: ['',Validators.required],
      categoria36: ['',Validators.required],
      pregunta37: ['',Validators.required],
      categoria37: ['',Validators.required],
      pregunta38: ['',Validators.required],
      categoria38: ['',Validators.required],
      pregunta39: ['',Validators.required],
      categoria39: ['',Validators.required],
      pregunta40: ['',Validators.required],
      categoria40: ['',Validators.required],

      tipo:['likert',Validators.required]


    })

    this.registroService.getEtiquetas().subscribe(resp=>{
      this.collectionEtiquetas.data = resp.map( (e:any)=>{
        return{
          
          titulo: e.payload.doc.data().titulo,
          
          idFirebase: e.payload.doc.id
        }
      })
    },
    error=>{
      console.log(error);
    }
    );


    this.registroService.getFormularios().subscribe(resp=>{
      this.collectionFormularios.data = resp.map( (e:any)=>{
        return{
          
          
      nombre: e.payload.doc.data().nombre,

      cantidadOpciones: e.payload.doc.data().cantidadOpciones,
      cantidadPreguntas: e.payload.doc.data().cantidadPreguntas,

      instrucciones: e.payload.doc.data().instrucciones,
      linkImagen: e.payload.doc.data().linkImagen,

      
      enunciadoOpcion0: e.payload.doc.data().enunciadoOpcion0,
      enunciadoOpcion1: e.payload.doc.data().enunciadoOpcion1,
      enunciadoOpcion2: e.payload.doc.data().enunciadoOpcion2,
      enunciadoOpcion3: e.payload.doc.data().enunciadoOpcion3,
      enunciadoOpcion4: e.payload.doc.data().enunciadoOpcion4,
      enunciadoOpcion5: e.payload.doc.data().enunciadoOpcion5,


//sera un tope maximo de 40 preguntas

      pregunta1: e.payload.doc.data().pregunta1,
      categoria1: e.payload.doc.data().categoria1,
      pregunta2: e.payload.doc.data().pregunta2,
      categoria2: e.payload.doc.data().categoria2,
      pregunta3: e.payload.doc.data().pregunta3,
      categoria3: e.payload.doc.data().categoria3,
      pregunta4: e.payload.doc.data().pregunta4,
      categoria4: e.payload.doc.data().categoria4,
      pregunta5: e.payload.doc.data().pregunta5,
      categoria5: e.payload.doc.data().categoria5,
      pregunta6: e.payload.doc.data().pregunta6,
      categoria6: e.payload.doc.data().categoria6,
      pregunta7: e.payload.doc.data().pregunta7,
      categoria7: e.payload.doc.data().categoria7,
      pregunta8: e.payload.doc.data().pregunta8,
      categoria8: e.payload.doc.data().categoria8,
      pregunta9: e.payload.doc.data().pregunta9,
      categoria9: e.payload.doc.data().categoria9,
      pregunta10: e.payload.doc.data().pregunta10,
      categoria10: e.payload.doc.data().categoria10,
      pregunta11: e.payload.doc.data().pregunta11,
      categoria11: e.payload.doc.data().categoria11,
      pregunta12: e.payload.doc.data().pregunta12,
      categoria12: e.payload.doc.data().categoria12,
      pregunta13: e.payload.doc.data().pregunta13,
      categoria13: e.payload.doc.data().categoria13,
      pregunta14: e.payload.doc.data().pregunta14,
      categoria14: e.payload.doc.data().categoria14,
      pregunta15: e.payload.doc.data().pregunta15,
      categoria15: e.payload.doc.data().categoria15,
      pregunta16: e.payload.doc.data().pregunta16,
      categoria16: e.payload.doc.data().categoria16,
      pregunta17: e.payload.doc.data().pregunta17,
      categoria17: e.payload.doc.data().categoria17,
      pregunta18: e.payload.doc.data().pregunta18,
      categoria18: e.payload.doc.data().categoria18,
      pregunta19: e.payload.doc.data().pregunta19,
      categoria19: e.payload.doc.data().categoria19,
      pregunta20: e.payload.doc.data().pregunta20,
      categoria20: e.payload.doc.data().categoria20,
      pregunta21: e.payload.doc.data().pregunta21,
      categoria21: e.payload.doc.data().categoria21,
      pregunta22: e.payload.doc.data().pregunta22,
      categoria22: e.payload.doc.data().categoria22,
      pregunta23: e.payload.doc.data().pregunta23,
      categoria23: e.payload.doc.data().categoria23,
      pregunta24: e.payload.doc.data().pregunta24,
      categoria24: e.payload.doc.data().categoria24,     
      pregunta25: e.payload.doc.data().pregunta25,
      categoria25: e.payload.doc.data().categoria25,
      pregunta26: e.payload.doc.data().pregunta26,
      categoria26: e.payload.doc.data().categoria26,
      pregunta27: e.payload.doc.data().pregunta27,
      categoria27: e.payload.doc.data().categoria27,
      pregunta28: e.payload.doc.data().pregunta28,
      categoria28: e.payload.doc.data().categoria28,
      pregunta29: e.payload.doc.data().pregunta29,
      categoria29: e.payload.doc.data().categoria29,
      pregunta30: e.payload.doc.data().pregunta30,
      categoria30: e.payload.doc.data().categoria30,
      pregunta31: e.payload.doc.data().pregunta31,
      categoria31: e.payload.doc.data().categoria31,
      pregunta32: e.payload.doc.data().pregunta32,
      categoria32: e.payload.doc.data().categoria32,
      pregunta33: e.payload.doc.data().pregunta33,
      categoria33: e.payload.doc.data().categoria33,
      pregunta34: e.payload.doc.data().pregunta34,
      categoria34: e.payload.doc.data().categoria34,
      pregunta35: e.payload.doc.data().pregunta35,
      categoria35: e.payload.doc.data().categoria35,
      pregunta36: e.payload.doc.data().pregunta36,
      categoria36: e.payload.doc.data().categoria36,
      pregunta37: e.payload.doc.data().pregunta37,
      categoria37: e.payload.doc.data().categoria37,
      pregunta38: e.payload.doc.data().pregunta38,
      categoria38: e.payload.doc.data().categoria38,
      pregunta39: e.payload.doc.data().pregunta39,
      categoria39: e.payload.doc.data().categoria39,
      pregunta40: e.payload.doc.data().pregunta40,
      categoria40: e.payload.doc.data().categoria40,

      tipo:e.payload.doc.data().tipo,


          
          idFirebase: e.payload.doc.id
        }
      })
    },
    error=>{
      console.log(error);
    }
    );

  }

  abrirModal(){
 
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

  actualizarPreguntas(){

    
    for (let i = 0; i < 40; i++) {
      this.mostrarPregunta[i]=false;
    }

    
    for (let i = 0; i < this.formularioForm.value.cantidadPreguntas; i++) {
      this.mostrarPregunta[i]=true;
    }


  }

  actualizarOpciones(){

    
    for (let i = 0; i < 6; i++) {
      this.mostrarEnunciadoOpcion[i]=false;
    }

    
    for (let i = 0; i <= this.formularioForm.value.cantidadOpciones; i++) {
      this.mostrarEnunciadoOpcion[i]=true;
    }


  }

  


  
  openEditar(item:any) {

    this.actualizarPreguntasEditar(item.cantidadPreguntas);


    this.formularioForm.setValue({

      nombre: item.nombre,

      cantidadOpciones: item.cantidadOpciones,
      cantidadPreguntas: item.cantidadPreguntas,
      instrucciones: item.instrucciones,
      linkImagen: item.linkImagen,


      enunciadoOpcion0:  item.enunciadoOpcion0,
      enunciadoOpcion1:  item.enunciadoOpcion1,
      enunciadoOpcion2:  item.enunciadoOpcion2,
      enunciadoOpcion3:  item.enunciadoOpcion3,
      enunciadoOpcion4:  item.enunciadoOpcion4,
      enunciadoOpcion5:  item.enunciadoOpcion5,



      pregunta1: item.pregunta1,
      categoria1: item.categoria1,
      pregunta2: item.pregunta2,
      categoria2: item.categoria2,
      pregunta3: item.pregunta3,
      categoria3: item.categoria3,
      pregunta4: item.pregunta4,
      categoria4: item.categoria4,
      pregunta5: item.pregunta5,
      categoria5: item.categoria5,
      pregunta6: item.pregunta6,
      categoria6: item.categoria6,
      pregunta7: item.pregunta7,
      categoria7: item.categoria7,
      pregunta8: item.pregunta8,
      categoria8: item.categoria8,
      pregunta9: item.pregunta9,
      categoria9: item.categoria9,
      pregunta10: item.pregunta10,
      categoria10: item.categoria10,
      pregunta11: item.pregunta11,
      categoria11: item.categoria11,
      pregunta12: item.pregunta12,
      categoria12: item.categoria12,
      pregunta13: item.pregunta13,
      categoria13: item.categoria13,
      pregunta14: item.pregunta14,
      categoria14: item.categoria14,
      pregunta15: item.pregunta15,
      categoria15: item.categoria15,
      pregunta16: item.pregunta16,
      categoria16: item.categoria16,
      pregunta17: item.pregunta17,
      categoria17: item.categoria17,
      pregunta18: item.pregunta18,
      categoria18: item.categoria18,
      pregunta19: item.pregunta19,
      categoria19: item.categoria19,
      pregunta20: item.pregunta20,
      categoria20: item.categoria20,
      pregunta21: item.pregunta21,
      categoria21: item.categoria21,
      pregunta22: item.pregunta22,
      categoria22: item.categoria22,
      pregunta23: item.pregunta23,
      categoria23: item.categoria23,
      pregunta24: item.pregunta24,
      categoria24: item.categoria24,   
      pregunta25: item.pregunta25,
      categoria25: item.categoria25,
      pregunta26: item.pregunta26,
      categoria26: item.categoria26,
      pregunta27: item.pregunta27,
      categoria27: item.categoria27,
      pregunta28: item.pregunta28,
      categoria28: item.categoria28,
      pregunta29: item.pregunta29,
      categoria29: item.categoria29,
      pregunta30: item.pregunta30,
      categoria30: item.categoria30,
      pregunta31: item.pregunta31,
      categoria31: item.categoria31,
      pregunta32: item.pregunta32,
      categoria32: item.categoria32,
      pregunta33: item.pregunta33,
      categoria33: item.categoria33,
      pregunta34: item.pregunta34,
      categoria34: item.categoria34,
      pregunta35: item.pregunta35,
      categoria35: item.categoria35,
      pregunta36: item.pregunta36,
      categoria36: item.categoria36,
      pregunta37: item.pregunta37,
      categoria37: item.categoria37,
      pregunta38: item.pregunta38,
      categoria38: item.categoria38,
      pregunta39: item.pregunta39,
      categoria39: item.categoria39,
      pregunta40: item.pregunta40,
      categoria40: item.categoria40,

      tipo: item.tipo

   
    });
    
 
 this.idFirebaseActualizar = item.idFirebase;
 this.actualizar = true;

 document.getElementById('creacionFormulario').style.display='block';


}

actualizarPreguntasEditar(cantidad:any){


  for (let i = 0; i < 40; i++) {
    this.mostrarPregunta[i]=false;
  }

  

  for (let i = 0; i < cantidad; i++) {
    this.mostrarPregunta[i]=true;
  }
}

eliminar(item:any):void{
 Swal.fire({
   title:'¿Estas seguro que deseas eliminar este formulario?',
   text:'Esta accion no se podrá deshacer',
   icon:'warning',
   showCancelButton: true,
   confirmButtonColor: 'secondary',
   cancelButtonColor:'#d33',
   confirmButtonText: 'Si, Eliminar!'
 }).then(result => {
   if(result.value){
     //quiere cancelar
        //llenar el form
        this.registroService.deleteFormulario(item.idFirebase)

 Swal.fire('Formulario eliminado!', ' El formulario se ha eliminado correctamente ','success');
   }
 })
 return 

}

actualizarFormularioLikert(){
  this.registroService.updateFormulario( this.idFirebaseActualizar ,this.formularioForm.value).then(resp=>{
    this.formularioForm.reset();
    document.getElementById('creacionFormulario').style.display='none';
  }).catch(error=>{
    console.log(error);
  })
}



}
