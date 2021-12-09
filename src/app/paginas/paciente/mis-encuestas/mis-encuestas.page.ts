import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { RegistroService } from 'src/app/services/registro.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mis-encuestas',
  templateUrl: './mis-encuestas.page.html',
  styleUrls: ['./mis-encuestas.page.scss'],
})
export class MisEncuestasPage implements OnInit {

  cargando = true;



  collectionAsignaciones = {count: 20, data: []};
  collectionFormularioLikert = {count: 20, data: []};

    //para puntajes

    collectionEtiquetas = {count: 20, data: []};


  formularioLikertForm: FormGroup;


  tipo = 'likert';
  tituloEncuesta = 'Cargando';
  instruccionesEncuesta = 'Cargando';
  linkImagenEncuesta = 'loading';


  enunciadoOpcion0 = 'Cargando';
  enunciadoOpcion1 = 'Cargando';
  enunciadoOpcion2 = 'Cargando';
  enunciadoOpcion3 = 'Cargando';
  enunciadoOpcion4 = 'Cargando';
  enunciadoOpcion5 = 'Cargando';

  pregunta1 = 'Cargando';
  pregunta2 = 'Cargando';
  pregunta3 = 'Cargando';
  pregunta4 = 'Cargando';
  pregunta5 = 'Cargando';
  pregunta6 = 'Cargando';
  pregunta7 = 'Cargando';
  pregunta8 = 'Cargando';
  pregunta9 = 'Cargando';
  pregunta10 = 'Cargando';
  pregunta11 = 'Cargando';
  pregunta12 = 'Cargando';
  pregunta13 = 'Cargando';
  pregunta14 = 'Cargando';
  pregunta15 = 'Cargando';
  pregunta16 = 'Cargando';
  pregunta17 = 'Cargando';
  pregunta18 = 'Cargando';
  pregunta19 = 'Cargando';
  pregunta20 = 'Cargando';  
  pregunta21 = 'Cargando';
  pregunta22 = 'Cargando';
  pregunta23 = 'Cargando';
  pregunta24 = 'Cargando';
  pregunta25 = 'Cargando';
  pregunta26 = 'Cargando';
  pregunta27 = 'Cargando';
  pregunta28 = 'Cargando';
  pregunta29 = 'Cargando';
  pregunta30 = 'Cargando';
  pregunta31 = 'Cargando';
  pregunta32 = 'Cargando';
  pregunta33 = 'Cargando';
  pregunta34 = 'Cargando';
  pregunta35 = 'Cargando';
  pregunta36 = 'Cargando';
  pregunta37 = 'Cargando';
  pregunta38 = 'Cargando';
  pregunta39 = 'Cargando';
  pregunta40 = 'Cargando';



  mostrarEnunciadoOpcion= {};
  mostrarPregunta= {};

  nombre:any;
  puntajes:any;
  paciente:any;
  cantidadPreguntas:any;
  
  nombrePaciente = 'Cargando';
  apellidoPaciente = 'Cargando';
  rol = 'Cargando';



 

  constructor(
    public menuCtrl: MenuController,
    public fb: FormBuilder,
    public app: AppComponent,
    private registroService: RegistroService
  ) { }

  ngOnInit() {

    this.nombrePaciente = this.app.getNombre();
    this.rol = this.app.getRol();

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


  setTimeout(() => {

    this.cargando = false;


    this.registroService.getAsignacionesPaciente(this.app.getCorreo()).subscribe(resp=>{
      this.collectionAsignaciones.data = resp.map( (e:any)=>{
        return{
          correoPaciente: e.payload.doc.data().correoPaciente,
          nombreFormulario: e.payload.doc.data().nombreFormulario,
          tipoFormulario: e.payload.doc.data().tipoFormulario,


          idFirebase: e.payload.doc.id
        }
      })
    },
    error=>{
      console.log(error);
    }
    );
    
  }, 5000);

  

  
  this.formularioLikertForm = this.fb.group({

    nombre: ['',Validators.required],
    puntaje: ['',Validators.required],
    paciente: ['',Validators.required],


    respuesta1: ['',Validators.required],
    respuesta2: ['',Validators.required], 
    respuesta3: ['',Validators.required], 
    respuesta4: ['',Validators.required], 
    respuesta5: ['',Validators.required], 
    respuesta6: ['',Validators.required], 
    respuesta7: ['',Validators.required], 
    respuesta8: ['',Validators.required], 
    respuesta9: ['',Validators.required], 
    respuesta10: ['',Validators.required],
    respuesta11: ['',Validators.required],
    respuesta12: ['',Validators.required], 
    respuesta13: ['',Validators.required], 
    respuesta14: ['',Validators.required], 
    respuesta15: ['',Validators.required], 
    respuesta16: ['',Validators.required], 
    respuesta17: ['',Validators.required], 
    respuesta18: ['',Validators.required], 
    respuesta19: ['',Validators.required], 
    respuesta20: ['',Validators.required], 
    respuesta21: ['',Validators.required],
    respuesta22: ['',Validators.required], 
    respuesta23: ['',Validators.required], 
    respuesta24: ['',Validators.required], 
    respuesta25: ['',Validators.required], 
    respuesta26: ['',Validators.required], 
    respuesta27: ['',Validators.required], 
    respuesta28: ['',Validators.required], 
    respuesta29: ['',Validators.required], 
    respuesta30: ['',Validators.required], 
    respuesta31: ['',Validators.required],
    respuesta32: ['',Validators.required], 
    respuesta33: ['',Validators.required], 
    respuesta34: ['',Validators.required], 
    respuesta35: ['',Validators.required], 
    respuesta36: ['',Validators.required], 
    respuesta37: ['',Validators.required], 
    respuesta38: ['',Validators.required], 
    respuesta39: ['',Validators.required], 
    respuesta40: ['',Validators.required], 
    
    
  })


  }

    openFormulario(item:any){

    this.registroService.getFormularioNombre(item.nombreFormulario).subscribe(resp=>{
      this.collectionFormularioLikert.data = resp.map( (e:any)=>{
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

    setTimeout(() => {

      this.tipo = this.collectionFormularioLikert.data[0].tipo;

      this.tituloEncuesta = this.collectionFormularioLikert.data[0].nombre;
      this.instruccionesEncuesta = this.collectionFormularioLikert.data[0].instrucciones;
      this.linkImagenEncuesta = this.collectionFormularioLikert.data[0].linkImagen;

      
      this.enunciadoOpcion0 = this.collectionFormularioLikert.data[0].enunciadoOpcion0;
      this.enunciadoOpcion1 = this.collectionFormularioLikert.data[0].enunciadoOpcion1;
      this.enunciadoOpcion2 = this.collectionFormularioLikert.data[0].enunciadoOpcion2;
      this.enunciadoOpcion3 = this.collectionFormularioLikert.data[0].enunciadoOpcion3;
      this.enunciadoOpcion4 = this.collectionFormularioLikert.data[0].enunciadoOpcion4;
      this.enunciadoOpcion5 = this.collectionFormularioLikert.data[0].enunciadoOpcion5;

      this.pregunta1 = this.collectionFormularioLikert.data[0].pregunta1;
      this.pregunta2 = this.collectionFormularioLikert.data[0].pregunta2;
      this.pregunta3 = this.collectionFormularioLikert.data[0].pregunta3;
      this.pregunta4 = this.collectionFormularioLikert.data[0].pregunta4;
      this.pregunta5 = this.collectionFormularioLikert.data[0].pregunta5;
      this.pregunta6 = this.collectionFormularioLikert.data[0].pregunta6;
      this.pregunta7 = this.collectionFormularioLikert.data[0].pregunta7;
      this.pregunta8 = this.collectionFormularioLikert.data[0].pregunta8;
      this.pregunta9 = this.collectionFormularioLikert.data[0].pregunta9;
      this.pregunta10 = this.collectionFormularioLikert.data[0].pregunta10;
      this.pregunta11 = this.collectionFormularioLikert.data[0].pregunta11;
      this.pregunta12 = this.collectionFormularioLikert.data[0].pregunta12;
      this.pregunta13 = this.collectionFormularioLikert.data[0].pregunta13;
      this.pregunta14 = this.collectionFormularioLikert.data[0].pregunta14;
      this.pregunta15 = this.collectionFormularioLikert.data[0].pregunta15;
      this.pregunta16 = this.collectionFormularioLikert.data[0].pregunta16;
      this.pregunta17 = this.collectionFormularioLikert.data[0].pregunta17;
      this.pregunta18 = this.collectionFormularioLikert.data[0].pregunta18;
      this.pregunta19 = this.collectionFormularioLikert.data[0].pregunta19;
      this.pregunta20 = this.collectionFormularioLikert.data[0].pregunta20;
      this.pregunta21 = this.collectionFormularioLikert.data[0].pregunta21;
      this.pregunta22 = this.collectionFormularioLikert.data[0].pregunta22;
      this.pregunta23 = this.collectionFormularioLikert.data[0].pregunta23;
      this.pregunta24 = this.collectionFormularioLikert.data[0].pregunta24;
      this.pregunta25 = this.collectionFormularioLikert.data[0].pregunta25;
      this.pregunta26 = this.collectionFormularioLikert.data[0].pregunta26;
      this.pregunta27 = this.collectionFormularioLikert.data[0].pregunta27;
      this.pregunta28 = this.collectionFormularioLikert.data[0].pregunta28;
      this.pregunta29 = this.collectionFormularioLikert.data[0].pregunta29;
      this.pregunta30 = this.collectionFormularioLikert.data[0].pregunta30;
      this.pregunta31 = this.collectionFormularioLikert.data[0].pregunta31;
      this.pregunta32 = this.collectionFormularioLikert.data[0].pregunta32;
      this.pregunta33 = this.collectionFormularioLikert.data[0].pregunta33;
      this.pregunta34 = this.collectionFormularioLikert.data[0].pregunta34;
      this.pregunta35 = this.collectionFormularioLikert.data[0].pregunta35;
      this.pregunta36 = this.collectionFormularioLikert.data[0].pregunta36;
      this.pregunta37 = this.collectionFormularioLikert.data[0].pregunta37;
      this.pregunta38 = this.collectionFormularioLikert.data[0].pregunta38;
      this.pregunta39 = this.collectionFormularioLikert.data[0].pregunta39;
      this.pregunta40 = this.collectionFormularioLikert.data[0].pregunta40;



    

        //control limite de opciones
    for (let i = 0; i < 6; i++) {
      this.mostrarEnunciadoOpcion[i]=false;
    }
    

   
    for (let i = 0; i <= this.collectionFormularioLikert.data[0].cantidadOpciones; i++) {
      this.mostrarEnunciadoOpcion[i]=true;
    }

      //control limite de preguntas
    for (let i = 0; i < 40; i++) {
      this.mostrarPregunta[i]=false;
    }
    

   
    for (let i = 0; i < this.collectionFormularioLikert.data[0].cantidadPreguntas; i++) {
      this.mostrarPregunta[i]=true;
    }



    }, 4000);





      //abrir modal
      document.getElementById('formulariolikert').style.display='block';

    }

    crearFormulario(){

      this.generarPuntaje();


      this.formularioLikertForm.controls['puntaje'].setValue(this.puntajes);
      this.formularioLikertForm.controls['nombre'].setValue(this.tituloEncuesta);
      this.formularioLikertForm.controls['paciente'].setValue(this.app.getCorreo());



      this.registroService.createFormularioRespuestas(this.formularioLikertForm.value).then(resp=>{
      }).catch(error => {
        console.log('error'); 
      })



  
      document.getElementById('formulariolikert').style.display='none';

            
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Formulario enviado!',
        showConfirmButton: false,
        timer: 3000
      })
  
    }

    generarPuntaje(){

      var contador = 0;
      var categoria =[];
      var puntaje = [];
      var indice = 0;
      var puntajeLetras: string;

      for (let item of this.collectionEtiquetas.data) {

        contador = 0;


          if(item.titulo == this.collectionFormularioLikert.data[0].categoria1){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta1'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria2){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta2'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria3){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta3'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria4){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta4'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria5){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta5'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria6){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta6'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria7){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta7'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria8){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta8'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria9){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta9'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria10){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta10'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria11){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta11'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria12){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta12'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria13){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta13'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria14){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta14'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria15){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta15'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria16){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta16'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria17){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta17'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria18){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta18'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria19){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta19'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria20){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta20'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria21){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta21'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria22){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta22'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria23){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta23'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria24){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta24'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria25){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta25'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria26){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta26'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria27){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta27'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria28){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta28'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria29){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta29'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria30){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta30'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria31){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta31'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria32){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta32'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria33){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta33'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria34){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta34'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria35){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta35'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria36){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta36'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria37){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta37'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria38){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta38'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria39){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta39'].value);
          }
          if(item.titulo == this.collectionFormularioLikert.data[0].categoria40){
            contador = contador + parseInt(this.formularioLikertForm.controls['respuesta40'].value);
          }

          categoria[indice] = item.titulo;
          puntaje[indice] = contador;

          indice = indice + 1;

          
      }


      //transforma en letras el resultado
      for (let i = 0; i < indice; i++) {
        if(i==0){
          puntajeLetras = categoria[i] + ': ' + puntaje[i] + '; ';

        }else{
          puntajeLetras = puntajeLetras + categoria[i] + ': ' + puntaje[i] + '; ';
        }

      }

      this.puntajes = puntajeLetras;

    }



}
