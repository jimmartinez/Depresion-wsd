import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroService } from 'src/app/services/registro.service';

//para las alertas de persistencia
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.page.html',
  styleUrls: ['./profesionales.page.scss'],
})
export class ProfesionalesPage implements OnInit {

  collectionProfesionales = {count: 20, data: []};
  collectionEPS = {count: 20, data: []};

  profesionalForm: FormGroup;

  actualizar: boolean;
  nombre: any;
  rol:any;


  idFirebaseActualizar: string;



  constructor(
    public fb: FormBuilder,
    private registroService: RegistroService,
    private appComponent: AppComponent,
    private auth: AuthService

  ) { }

  ngOnInit() {
    
    this.nombre='Cargando';
    this.rol='Cargando';
    this.actualizar=false;

    this.idFirebaseActualizar = "";

    setTimeout(() => {

      this.registroService.getProfesionalCorreoEntidad(this.appComponent.getCorreo()).subscribe(resp=>{
        this.collectionProfesionales.data = resp.map( (e:any)=>{
          return{
            
            nombre: e.payload.doc.data().nombre,
            documento: e.payload.doc.data().documento,
            tipoDoc: e.payload.doc.data().tipoDoc,
            especialidad: e.payload.doc.data().especialidad,
            tarjetaProfesional: e.payload.doc.data().tarjetaProfesional,
            tipoContrato: e.payload.doc.data().tipoContrato,
            practicante: e.payload.doc.data().practicante,
            correoPrincipal: e.payload.doc.data().correoPrincipal,
            entidadDeSalud:e.payload.doc.data().entidadDeSalud,
            rol:e.payload.doc.data().rol,

            
            idFirebase: e.payload.doc.id
          }
        })
      },
      error=>{
        console.log(error);
      }
      );
      
    }, 8000);

    setTimeout(() => {

      this.registroService.getEPSCorreo(this.appComponent.getCorreo()).subscribe(resp=>{
        this.collectionEPS.data = resp.map( (e:any)=>{
          return{
            
            sede1Nombre: e.payload.doc.data().sede1Nombre,
            rol:e.payload.doc.data().rol,
            idFirebase: e.payload.doc.id
          }
        })
      },
      error=>{
        console.log(error);
      }
      );
      
    }, 9000);




    this.profesionalForm = this.fb.group({

      nombre: ['',Validators.required],
      documento: ['',Validators.required],
      tipoDoc: ['',Validators.required],      
      especialidad: ['',Validators.required],
      tarjetaProfesional: [,Validators.required],
      tipoContrato: ['',Validators.required],
      practicante: ['',Validators.required],
      correoPrincipal: ['',Validators.required],
      rol: ['profesional',Validators.required],


      entidadDeSalud: [this.appComponent.getCorreo(),Validators.required],
      
    })

    setTimeout(() => {
    
        this.nombre = this.collectionEPS.data[0].sede1Nombre.toString();
        this.rol = this.collectionEPS.data[0].rol.toString();
    
    }, 10000);
    



  }

  

    
  abrirFormulario() {

    
    //llenar el form
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
  
      this.actualizar = false;
      //abrir modal
      document.getElementById('profesional').style.display='block';

    }

    guardarProfesional(){


            //authservice
    this.registroService.createProfesional(this.profesionalForm.value).then(resp=>{
    }).catch(error => {
      console.log('error'); 
    })


    setTimeout(() => {
      this.auth.crearUsuario(this.profesionalForm.value.correoPrincipal,'12345678');
    }, 2000);
    

    setTimeout(() => {
      this.auth.cambiarContra(this.profesionalForm.value.correoPrincipal);
    }, 3000);
    

  
    setTimeout(() => {
      this.profesionalForm.reset();
    }, 4000);
    
      document.getElementById('profesional').style.display='none';
    }

    actualizarProfesional(){
      this.registroService.updateProfesional( this.idFirebaseActualizar ,this.profesionalForm.value).then(resp=>{
        this.profesionalForm.reset();
        document.getElementById('profesional').style.display='none';
      }).catch(error=>{
        console.log(error);
      })
    }

    
  openEditar(item:any) {

       //llenar el form
       this.profesionalForm.setValue({
        nombre: item.nombre,
        documento: item.documento,
        tipoDoc: item.tipoDoc,
        especialidad: item.especialidad,
        tarjetaProfesional: item.tarjetaProfesional,
        tipoContrato: item.tipoContrato,
        practicante: item.practicante,
        correoPrincipal: item.correoPrincipal,
        entidadDeSalud: item.entidadDeSalud,
        rol: 'profesional'
      });

    this.idFirebaseActualizar = item.idFirebase;
    this.actualizar = true;

    document.getElementById('profesional').style.display='block';


  }

  eliminar(item:any):void{
    Swal.fire({
      title:'¿Estas seguro que deseas eliminar este usuario?',
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
           this.registroService.deleteProfesional(item.idFirebase)

    Swal.fire('¡Usuario eliminado!', ' El usuario se ha eliminado correctamente ','success');
      }
    })
    return 

  }
  
  

}
