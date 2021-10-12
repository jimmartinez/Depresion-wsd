import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {

  collectionPacientes = {count: 20, data: []};

  nombre:any;
  apellido:any;
  correo:any;
  

  constructor(
    public fb: FormBuilder,
    private registroService: RegistroService,
    private appComponent: AppComponent,
    private auth: AuthService
  ) { }

  ngOnInit() {


    setTimeout(() => {

      this.registroService.getInfobasica().subscribe(resp=>{
        this.collectionPacientes.data = resp.map( (e:any)=>{
          return{
            
            nombre: e.payload.doc.data().nombre,
            apellido1:e.payload.doc.data().apellido1,
            correoPrincipal: e.payload.doc.data().correoPrincipal,
            
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

}
