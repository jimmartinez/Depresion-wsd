import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {


  collectionInfoSociodemografica = {count: 20, data: []};

  infosociodemograficaForm: FormGroup;
  correo: any;
  idFirebaseActualizar: string;
  actualizar: boolean;



  constructor(
    private registroService: RegistroService,
    public fb: FormBuilder,
    private authService: AuthService,
    public auth: AngularFireAuth,
    public router: Router,


  ) {}

  ngOnInit() {

    setInterval(() => {


        this.auth.onAuthStateChanged(user=>{
          if(user){
            this.correo = user.email;
      
          }else{
            this.router.navigateByUrl('login');
          }
        })
      }, 5000);



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

  }, 5000);

/*

*/

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

    document.getElementById('id03').style.display='block';

  }

  actualizarInfoSociodemografica(){
    

    if(this.idFirebaseActualizar!=null){
     //quiere cancelar
             //llenar el form
             try{

              this.registroService.updateInfoSociodemografica( this.idFirebaseActualizar ,this.infosociodemograficaForm.value).then(resp=>{
                document.getElementById('id03').style.display='none';
              }).catch(error=>{
                console.log(error);
              })
               document.getElementById('id03').style.display='none';
            }catch(error){console.log(error)}
             }
  }

}
