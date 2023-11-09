import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { RegistroService } from 'src/app/services/registro.service';

//para la generacion del pdf
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import { formatDate } from '@angular/common';
import { DiagnosticCategory } from 'typescript';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';


@Component({
  selector: 'app-android',
  templateUrl: './android.page.html',
  styleUrls: ['./android.page.scss'],
})
export class AndroidPage implements OnInit {


  collectionPuntajesA = {count: 20, data: []};
  collectionRespuestas = {count: 20, data: []};

  nombreProfesional ='cargando';

  
  handleSearch(value:string){
    this.filtro_valor = value; 
  }

  filtro_valor='';
  

  constructor(   
    private registroService: RegistroService,
    public app: AppComponent
    ) { }


    fechaIni= new Date;

  ngOnInit() {

    setInterval(() => {
      this.nombreProfesional = this.app.getNombre();
    }, 5000);

        
    setTimeout(() => {

      console.log(this.collectionPuntajesA.data[0].correo)
      

    }, 5000);
  }

  descargarPDF(){
    const doc = new jsPDF('landscape')
    autoTable(doc, { html: '#tabla' })
    doc.save('registros.pdf')

  }


  asignarFecha(){
    
    this.collectionPuntajesA.data = [];
    var str = (<HTMLInputElement>document.getElementById('fecha')).value;
  var splitted = str.split("-", 3); 

    var dia = parseInt(splitted[2]);
    var mes = parseInt(splitted[1]);
    var anio = parseInt(splitted[0]);

    console.log('dia'+dia)
    console.log('mes'+mes)
    console.log('año'+anio)

    this.fechaIni.setDate(dia-2);
    this.fechaIni.setMonth(mes-1);
    this.fechaIni.setFullYear(anio);

    console.log(this.fechaIni)

   
    setTimeout(() => {

      this.registroService.getPromedioAndroid( this.fechaIni).subscribe(resp=>{

        this.collectionPuntajesA.data = resp.map( (e:any)=>{
          return{
            
            correo: e.payload.doc.data().correo,
            fecha: new Date(e.payload.doc.data().fecha.seconds * 1000).toISOString().slice(0, 10),
            promedio: e.payload.doc.data().promedio,
            variable: e.payload.doc.data().variable,
            
            idFirebase: e.payload.doc.id
  
          }
        })
      },
      error=>{
        console.log('errrrrrrrrrrrrrrrrrrrrr');
      }
  
      );
      

    }, 5000);



  }


  verRespuestas(item:any){
    document.getElementById('verRespuestas').style.display='block';


    //obtener correo, fecha, pregunta y respuesta
    


      this.registroService.getRespuestasAndroid( this.fechaIni, item.correo).subscribe(resp=>{

        this.collectionRespuestas.data = resp.map( (e:any)=>{
          return{
            
            
            fecha: new Date(e.payload.doc.data().fecha.seconds * 1000).toISOString().slice(0, 10),
            pregunta: e.payload.doc.data().pregunta,
            respuesta: e.payload.doc.data().respuesta,
            
            idFirebase: e.payload.doc.id
  
          }
        })
      },
      error=>{
        console.log('hay un error'+error);
      }
  
      );
    

  }


}