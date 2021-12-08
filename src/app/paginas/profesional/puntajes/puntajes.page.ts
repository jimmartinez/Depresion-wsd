import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';

//para la generacion del pdf
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.page.html',
  styleUrls: ['./puntajes.page.scss'],
})
export class PuntajesPage implements OnInit {


  collectionPuntajes = {count: 20, data: []};

  nombreProfesional ='cargando';


  constructor(   
    private registroService: RegistroService,
    public app: AppComponent
    ) { }

  ngOnInit() {

    setInterval(() => {
      this.nombreProfesional = this.app.getNombre();
    }, 1000);


    
    setTimeout(() => {

      this.registroService.getFormularioRespuestas().subscribe(resp=>{
        this.collectionPuntajes.data = resp.map( (e:any)=>{
          return{
            
            nombre: e.payload.doc.data().nombre,
            paciente:e.payload.doc.data().paciente,
            puntaje: e.payload.doc.data().puntaje,
            
            idFirebase: e.payload.doc.id
          }
        })
      },
      error=>{
        console.log(error);
      }
      );
      

    }, 4000);
  }

  descargarPDF(){
    const doc = new jsPDF('landscape')
    autoTable(doc, { html: '#tabla' })
    doc.save('registros.pdf')

  }


}
