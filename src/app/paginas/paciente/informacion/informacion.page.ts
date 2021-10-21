import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroService } from 'src/app/services/registro.service';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }
  
           $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
  
           if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
          $slideEl
            .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
  
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
    }
  };

  @ViewChild('slides') slides: IonSlides;

  cargando = true;
  


  collectionInfoSociodemografica = {count: 20, data: []};
  collectionInfoBasica = {count: 20, data: []};
  collectionEPS = {count: 20, data: []};


  infosociodemograficaForm: FormGroup;
  registroForm: FormGroup;

  correo: any;
  nombre: any;
  apellido: any;
  rol:any;
  idFirebaseActualizarBasica: string;
  idFirebaseActualizarSocio: string;
  actualizar: boolean;


  


  mostrarBasica = true;
  mostrarSocio = false;
  mostrar = false;


  constructor(
    private registroService: RegistroService,
    public fb: FormBuilder,
    public auth: AngularFireAuth,
    public router: Router,
    private app: AppComponent


  ) {}

  ngOnInit() {

    this.registroService.getEPS().subscribe(resp=>{
      this.collectionEPS.data = resp.map( (e:any)=>{
        return{
          correoPrincipal: e.payload.doc.data().correoPrincipal,
          idFirebase: e.payload.doc.id
        }
      })
    },
    error=>{
      console.log(error);
    }
    );


    
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
      nombreContacto: ['',Validators.required],
      telefonoContacto: ['',Validators.required],
      servicioSalud: ['',Validators.required],


    })


    //este si debe ir porque verifica que si este autenticado
    setTimeout(() => {
      this.correo = this.app.getCorreo();
      console.log(this.correo)
    }, 4000);
          
    



  
      setTimeout(() => {
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
              nombreContacto: e.payload.doc.data().nombreContacto,
              telefonoContacto: e.payload.doc.data().telefonoContacto,
              servicioSalud: e.payload.doc.data().servicioSalud,
              autorizacionContacto: e.payload.doc.data().servicioSalud,
              rol: e.payload.doc.data().rol,
              
    
    
              idFirebase: e.payload.doc.id,
    
            }
          })
        },
        error=>{
          console.log(error);
        }
        );
      
      }, 4500);

    setTimeout(() => {
    
      
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


//aqui pongo la informacion del header que 
    setTimeout(() => {
      try {
        this.cargando = false;

        this.mostrar=true;
        this.abrirEditarInfoSociodemografica();
        this.abrirEditarInfoBasica();
        this.nombre = this.collectionInfoBasica.data[0].nombre.toString();
        this.apellido = this.collectionInfoBasica.data[0].apellido1.toString();
        this.rol = this.collectionInfoBasica.data[0].rol.toString();
      } catch (error) {
      }

    }, 5500);


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

    
    this.idFirebaseActualizarSocio = this.collectionInfoSociodemografica.data[0].idFirebase;
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
      nombreContacto: this.collectionInfoBasica.data[0].nombreContacto,
      telefonoContacto: this.collectionInfoBasica.data[0].telefonoContacto,
      servicioSalud: this.collectionInfoBasica.data[0].servicioSalud,
      

    });

    
    this.idFirebaseActualizarBasica = this.collectionInfoBasica.data[0].idFirebase;
    this.actualizar = true;


  }

  actualizarInfoSociodemografica(){
    

    if(this.idFirebaseActualizarSocio!=null){
     //quiere cancelar
             //llenar el form
             try{

              this.registroService.updateInfoSociodemografica( this.idFirebaseActualizarSocio ,this.infosociodemograficaForm.value).then(resp=>{
              }).catch(error=>{
                console.log(error);
              })
            }catch(error){console.log(error)}
             }
  }

  actualizarInfoBasica(){


    this.registroForm.controls['servicioSalud'].setValue(this.collectionInfoBasica.data[0].servicioSalud);

    

    if(this.idFirebaseActualizarBasica!=null){
     //quiere cancelar
             //llenar el form
             try{

              this.registroService.updateInfoBasica( this.idFirebaseActualizarBasica ,this.registroForm.value).then(resp=>{
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




