import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { RegistroService } from 'src/app/services/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-etiquetas',
  templateUrl: './etiquetas.page.html',
  styleUrls: ['./etiquetas.page.scss'],
})
export class EtiquetasPage implements OnInit {


  collectionEtiquetas = {count: 20, data: []};


  etiquetaForm: FormGroup;

  nombreProfesional ='cargando';



  constructor(
    public fb: FormBuilder,
    private registroService: RegistroService,
    public app: AppComponent

  ) { }

  ngOnInit() {

      setInterval(() => {
        this.nombreProfesional = this.app.getNombre();
      }, 1000);



    this.etiquetaForm = this.fb.group({

      titulo: ['',Validators.required],
      
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

    
  }


   
  abrirFormulario() {

    
    //llenar el form
    this.etiquetaForm.setValue({
      titulo: '',

    });
  
      //abrir modal
      document.getElementById('etiqueta').style.display='block';

    }

    crearEtiqueta(){
      this.registroService.createEtiqueta(this.etiquetaForm.value).then(resp=>{
      }).catch(error => {
        console.log('error'); 
      })

      document.getElementById('etiqueta').style.display='none';

    }

    eliminar(item:any):void{
      Swal.fire({
        title:'¿Estas seguro que deseas eliminar esta etiqueta?',
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
             this.registroService.deleteEtiqueta(item.idFirebase)
  
      Swal.fire('Etiqueta eliminada!', ' La etiqueta se ha eliminado correctamente ','success');
        }
      })
      return 
  
    }



}
