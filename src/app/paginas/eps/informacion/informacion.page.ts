import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  correo: any;
  actualizar: boolean;
  idFirebaseActualizar: string;
  nombre: any;
  apellido: any;
  rol:any;


  EPSForm: FormGroup;

  collectionInfoEPS = {count: 20, data: []};


  constructor(
    public fb: FormBuilder,
    private registroService: RegistroService,
    private appComponent: AppComponent,
    private router: Router

  ) { }

  ngOnInit() {


    this.nombre='Cargando';
    this.rol='Cargando';
    this.actualizar=false;




    this.EPSForm = this.fb.group({

      nit: ['',Validators.required],
      idAdministrador: ['',Validators.required],
      nombreAdmin: ['',Validators.required],
      sede1Nombre: ['',Validators.required],
      sede1Tel: ['',Validators.required],
      sede1Pag: ['',Validators.required],
      sede1Dir: ['',Validators.required],
      sede2Nombre: ['',Validators.required],
      sede2Tel: ['',Validators.required],
      sede2Pag: ['',Validators.required],
      sede2Dir: ['',Validators.required],
      sede3Nombre: ['',Validators.required],
      sede3Tel: ['',Validators.required],
      sede3Pag: ['',Validators.required],
      sede3Dir: ['',Validators.required],
      correoPrincipal: ['',Validators.required],
      correoSecundario: ['',Validators.required],


    })

      
      //este si debe ir porque verifica que si este autenticado
      setInterval(() => {
        this.correo = this.appComponent.getCorreo();
        if(this.correo == undefined){
          this.router.navigateByUrl('login');
          }else{
          }
        
      }, 7000);
  
      setInterval(() => {

         

  this.registroService.getEPSCorreo(this.correo).subscribe(resp=>{
    this.collectionInfoEPS.data = resp.map( (e:any)=>{
      return{
  
        nit: e.payload.doc.data().nit,
        idAdministrador: e.payload.doc.data().idAdministrador,
        nombreAdmin: e.payload.doc.data().nombreAdmin,
        sede1Nombre: e.payload.doc.data().sede1Nombre,
        sede1Tel: e.payload.doc.data().sede1Tel,
        sede1Pag: e.payload.doc.data().sede1Pag,
        sede1Dir: e.payload.doc.data().sede1Dir,
        sede2Nombre: e.payload.doc.data().sede2Nombre,
        sede2Tel: e.payload.doc.data().sede2Tel,
        sede2Pag: e.payload.doc.data().sede2Pag,
        sede2Dir: e.payload.doc.data().sede2Dir,
        sede3Nombre: e.payload.doc.data().sede3Nombre,
        sede3Tel: e.payload.doc.data().sede3Tel,
        sede3Pag: e.payload.doc.data().sede3Pag,
        sede3Dir: e.payload.doc.data().sede3Dir,
        correoPrincipal: e.payload.doc.data().correoPrincipal,
        correoSecundario: e.payload.doc.data().correoSecundario,

        rol: e.payload.doc.data().rol,

        idFirebase: e.payload.doc.id,

      }
    })
  },
  error=>{
    console.log(error);
  }
  );

}, 8000);


setTimeout(() => {

  this.abrirEditarInfoEPS();

    this.nombre = this.collectionInfoEPS.data[0].sede1Nombre.toString();
    this.rol = this.collectionInfoEPS.data[0].rol.toString();

}, 8500);


  }



  abrirEditarInfoEPS(){

    this.EPSForm.setValue({

      nit: this.collectionInfoEPS.data[0].nit,      
      idAdministrador: this.collectionInfoEPS.data[0].idAdministrador,
      nombreAdmin: this.collectionInfoEPS.data[0].nombreAdmin,

      sede1Nombre: this.collectionInfoEPS.data[0].sede1Nombre,
      sede1Tel: this.collectionInfoEPS.data[0].sede1Tel,
      sede1Pag: this.collectionInfoEPS.data[0].sede1Pag,
      sede1Dir: this.collectionInfoEPS.data[0].sede1Dir,

      sede2Nombre: this.collectionInfoEPS.data[0].sede2Nombre,
      sede2Tel: this.collectionInfoEPS.data[0].sede2Tel,
      sede2Pag: this.collectionInfoEPS.data[0].sede2Pag,
      sede2Dir: this.collectionInfoEPS.data[0].sede2Dir,

      sede3Nombre: this.collectionInfoEPS.data[0].sede3Nombre,
      sede3Tel: this.collectionInfoEPS.data[0].sede3Tel,
      sede3Pag: this.collectionInfoEPS.data[0].sede3Pag,
      sede3Dir: this.collectionInfoEPS.data[0].sede3Dir,


      correoPrincipal: this.collectionInfoEPS.data[0].correoPrincipal,
      correoSecundario: this.collectionInfoEPS.data[0].correoSecundario,
      

    });

    
    this.idFirebaseActualizar = this.collectionInfoEPS.data[0].idFirebase;
    this.actualizar = true;


  }


  actualizarInfoEPS(){
    

    if(this.idFirebaseActualizar!=null){
     //quiere cancelar
             //llenar el form
             try{

              this.registroService.updateEPS( this.idFirebaseActualizar ,this.EPSForm.value).then(resp=>{
              }).catch(error=>{
                console.log(error);
              })
              
            }catch(error){console.log(error)}
             }
             
             setTimeout(() => {
               this.refrescar();
            }, 1500);
  }


  
  refrescar(){
    window.location.reload()
  }

 


}
