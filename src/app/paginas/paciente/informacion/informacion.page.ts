import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {


  @ViewChild('slides') slides: IonSlides;


  collectionInfoSociodemografica = {count: 20, data: []};
  collectionInfoBasica = {count: 20, data: []};

  infosociodemograficaForm: FormGroup;
  correo: any;
  idFirebaseActualizar: string;
  actualizar: boolean;

  registroForm: FormGroup;

  


  mostrarBasica = true;
  mostrarSocio = false;
  mostrar = false;


  constructor(
    private registroService: RegistroService,
    public fb: FormBuilder,
    public auth: AngularFireAuth,
    public router: Router,


  ) {}

  ngOnInit() {


    
    this.infosociodemograficaForm = this.fb.group({
      trabaja: ['',Validators.required],
      trabajoRelacionado: ['',Validators.required],
      motivoTrabajo: ['',Validators.required],
      campoTrabajo: ['',Validators.required],
      empleado: ['',Validators.required],
      tipoEmpresa: ['',Validators.required],
      horasTrabajo: ['',Validators.required],
      estadoCivil: ['',Validators.required],
      conQuienVive: ['',Validators.required],
      tipoVivienda: ['',Validators.required],
      tipoRedSocial: ['',Validators.required],
      redSocialFavorita: ['',Validators.required],
      autorizacionContacto: ['',Validators.required]
    })

    
    this.registroForm = this.fb.group({
      
      nombre: ['',Validators.required],
      apellido1: ['',Validators.required],
      apellido2: ['',Validators.required],
      fechaNacimiento: ['',Validators.required],
      lugarNacimiento: ['',Validators.required],
      genero: ['',Validators.required],
      orientacionSexual: ['',Validators.required],
      direccionResidencia: ['',Validators.required],
      direccionLaboral: ['',Validators.required],
      estrato: ['',Validators.required],
      correoPrincipal: ['',Validators.required],
      correoSecundario: ['',Validators.required],
      contra: ['',Validators.required],
      confirmaContra: ['',Validators.required],
      nombreContacto: ['',Validators.required],
      telefonoContacto: ['',Validators.required],
      servicioSalud: ['',Validators.required],


    })

    setInterval(() => {


        this.auth.onAuthStateChanged(user=>{
          if(user){
            this.correo = user.email;
          }else{
            this.router.navigateByUrl('login');
          }
        })
      }, 7000);



  
      setInterval(() => {
        this.registroService.getInfoBasicaCorreo(this.correo).subscribe(resp=>{
          this.collectionInfoBasica.data = resp.map( (e:any)=>{
            return{
        
              nombre: e.payload.doc.data().nombre,
              apellido1: e.payload.doc.data().apellido1,
              apellido2: e.payload.doc.data().apellido2,
              fechaNacimiento: e.payload.doc.data().fechaNacimiento,
              lugarNacimiento: e.payload.doc.data().lugarNacimiento,
              genero: e.payload.doc.data().genero,
              orientacionSexual: e.payload.doc.data().orientacionSexual,
              direccionResidencia: e.payload.doc.data().direccionResidencia,
              direccionLaboral: e.payload.doc.data().direccionLaboral,
              estrato: e.payload.doc.data().estrato,
              correoPrincipal: e.payload.doc.data().correoPrincipal,
              correoSecundario: e.payload.doc.data().correoSecundario,
              contra: e.payload.doc.data().contra,
              confirmaContra: e.payload.doc.data().confirmaContra,
              nombreContacto: e.payload.doc.data().nombreContacto,
              telefonoContacto: e.payload.doc.data().telefonoContacto,
              servicioSalud: e.payload.doc.data().servicioSalud,
              autorizacionContacto: e.payload.doc.data().servicioSalud,
    
    
              idFirebase: e.payload.doc.id,
    
            }
          })
        },
        error=>{
          console.log(error);
        }
        );
    
      }, 7000);

    setInterval(() => {
    this.registroService.getInfoSociodemograficaCorreo(this.correo).subscribe(resp=>{
      this.collectionInfoSociodemografica.data = resp.map( (e:any)=>{
        return{
          trabaja: e.payload.doc.data().trabaja,
          trabajoRelacionado: e.payload.doc.data().trabajoRelacionado,
          motivoTrabajo: e.payload.doc.data().motivoTrabajo,
          campoTrabajo: e.payload.doc.data().campoTrabajo,
          empleado: e.payload.doc.data().empleado,
          tipoEmpresa: e.payload.doc.data().tipoEmpresa,
          horasTrabajo: e.payload.doc.data().horasTrabajo,
          estadoCivil: e.payload.doc.data().estadoCivil,
          conQuienVive: e.payload.doc.data().conQuienVive,
          tipoVivienda: e.payload.doc.data().tipoVivienda,
          tipoRedSocial: e.payload.doc.data().tipoRedSocial,
          redSocialFavorita: e.payload.doc.data().redSocialFavorita,
          autorizacionContacto: e.payload.doc.data().autorizacionContacto,

          idFirebase: e.payload.doc.id,

        }
      })
    },
    error=>{
      console.log(error);
    }
    );

  }, 7000);



    setTimeout(() => {

      this.mostrar=true;
      this.abrirEditarInfoSociodemografica();
      this.abrirEditarInfoBasica();
      

    }, 7500);


/* *ngIf="mostrar==true" */


  }


  slideChanged() { 
    if(this.mostrarBasica == true){
      this.mostrarBasica = false;
      this.mostrarSocio = true;
    }else{
      this.mostrarBasica = true;
      this.mostrarSocio = false;
    }

  }

  
  goToBasica() {
    this.slides.slideTo(0);
  }

  goToSocio() {
    this.slides.slideTo(1);
  }



  abrirEditarInfoSociodemografica(){

    this.infosociodemograficaForm.setValue({

      trabaja: this.collectionInfoSociodemografica.data[0].trabaja,
      trabajoRelacionado: this.collectionInfoSociodemografica.data[0].trabajoRelacionado,
      motivoTrabajo: this.collectionInfoSociodemografica.data[0].motivoTrabajo,
      campoTrabajo: this.collectionInfoSociodemografica.data[0].campoTrabajo,
      empleado: this.collectionInfoSociodemografica.data[0].empleado,
      tipoEmpresa: this.collectionInfoSociodemografica.data[0].tipoEmpresa,
      horasTrabajo: this.collectionInfoSociodemografica.data[0].horasTrabajo,
      estadoCivil: this.collectionInfoSociodemografica.data[0].estadoCivil,
      conQuienVive: this.collectionInfoSociodemografica.data[0].conQuienVive,
      tipoVivienda: this.collectionInfoSociodemografica.data[0].tipoVivienda,
      tipoRedSocial: this.collectionInfoSociodemografica.data[0].tipoRedSocial,
      redSocialFavorita: this.collectionInfoSociodemografica.data[0].redSocialFavorita,
      autorizacionContacto: this.collectionInfoSociodemografica.data[0].autorizacionContacto,
      
    });

    
    this.idFirebaseActualizar = this.collectionInfoSociodemografica.data[0].idFirebase;
    this.actualizar = true;


  }

  abrirEditarInfoBasica(){

    this.registroForm.setValue({

      nombre: this.collectionInfoBasica.data[0].nombre,      
      apellido1: this.collectionInfoBasica.data[0].apellido1,
      apellido2: this.collectionInfoBasica.data[0].apellido2,
      fechaNacimiento: this.collectionInfoBasica.data[0].fechaNacimiento,
      lugarNacimiento: this.collectionInfoBasica.data[0].lugarNacimiento,
      genero: this.collectionInfoBasica.data[0].genero,
      orientacionSexual: this.collectionInfoBasica.data[0].orientacionSexual,
      direccionResidencia: this.collectionInfoBasica.data[0].direccionResidencia,
      direccionLaboral: this.collectionInfoBasica.data[0].direccionLaboral,
      estrato: this.collectionInfoBasica.data[0].estrato,
      correoPrincipal: this.collectionInfoBasica.data[0].correoPrincipal,
      correoSecundario: this.collectionInfoBasica.data[0].correoSecundario,
      contra: this.collectionInfoBasica.data[0].contra,
      confirmaContra: this.collectionInfoBasica.data[0].confirmaContra,
      nombreContacto: this.collectionInfoBasica.data[0].nombreContacto,
      telefonoContacto: this.collectionInfoBasica.data[0].telefonoContacto,
      servicioSalud: this.collectionInfoBasica.data[0].servicioSalud,
      

    });

    
    this.idFirebaseActualizar = this.collectionInfoBasica.data[0].idFirebase;
    this.actualizar = true;


  }

  actualizarInfoSociodemografica(){
    

    if(this.idFirebaseActualizar!=null){
     //quiere cancelar
             //llenar el form
             try{

              this.registroService.updateInfoSociodemografica( this.idFirebaseActualizar ,this.infosociodemograficaForm.value).then(resp=>{
              }).catch(error=>{
                console.log(error);
              })
            }catch(error){console.log(error)}
             }
  }

  actualizarInfoBasica(){
    

    if(this.idFirebaseActualizar!=null){
     //quiere cancelar
             //llenar el form
             try{

              this.registroService.updateInfoBasica( this.idFirebaseActualizar ,this.registroForm.value).then(resp=>{
              }).catch(error=>{
                console.log(error);
              })
            }catch(error){console.log(error)}
             }
  }

}
