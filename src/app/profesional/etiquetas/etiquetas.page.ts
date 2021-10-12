import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-etiquetas',
  templateUrl: './etiquetas.page.html',
  styleUrls: ['./etiquetas.page.scss'],
})
export class EtiquetasPage implements OnInit {


  collectionEtiquetas = {count: 20, data: []};


  etiquetaForm: FormGroup;


  constructor(
    public fb: FormBuilder,
    private registroService: RegistroService,
  ) { }

  ngOnInit() {

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

}
