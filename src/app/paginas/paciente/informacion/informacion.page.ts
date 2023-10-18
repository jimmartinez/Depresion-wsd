import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroService } from 'src/app/services/registro.service';
import Swal from 'sweetalert2';


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
      autorizacionContacto: [false,Validators.required],
      usaReddit: [false,Validators.required],
      usuarioReddit: ['',Validators.required],
      usaInstagram: [false,Validators.required],
      usuarioInstagram: ['',Validators.required],
      usaFacebook: [false,Validators.required],
      usuarioFacebook: ['',Validators.required],
      usaTwitter: [false,Validators.required],
      usuarioTwitter: ['',Validators.required],
      usaTiktok: [false,Validators.required],
      usuarioTiktok: ['',Validators.required],
      redSocialFavorita: ['',Validators.required]
    })

    
    this.registroForm = this.fb.group({
      
      nombre: ['',Validators.required],
      apellido1: ['',Validators.required],
      apellido2: ['',Validators.required],
      tipoDoc: ['',Validators.required],
      numDoc: ['',Validators.required],
      lugarNacimiento: ['',Validators.required],
      telefonoContacto: ['',Validators.required],
      correoPrincipal: ['',Validators.required],
      correoSecundario: ['',Validators.required],
      edad: ['',Validators.required],
      sexo: ['',Validators.required],
      identidadGenero: ['',Validators.required],
      orientacionSexual: ['',Validators.required],
      estrato: ['',Validators.required],
      estadoCivil: ['',Validators.required],
      

    })


    //este si debe ir porque verifica que si este autenticado
    setTimeout(() => {
      this.correo = this.app.getCorreo();
      console.log(this.correo)
      console.log(this.collectionInfoBasica.data[0].nombre)
    }, 4000);
          
    



  
      setTimeout(() => {
        this.registroService.getInfoBasicaCorreo(this.correo).subscribe(resp=>{
          this.collectionInfoBasica.data = resp.map( (e:any)=>{
            return{
        
              nombre: e.payload.doc.data().nombre,
              apellido1: e.payload.doc.data().apellido1,
              apellido2: e.payload.doc.data().apellido2,
              tipoDoc: e.payload.doc.data().tipoDoc,
              numDoc: e.payload.doc.data().numDoc,
              lugarNacimiento: e.payload.doc.data().lugarNacimiento,
              telefonoContacto: e.payload.doc.data().telefonoContacto,
              correoPrincipal: e.payload.doc.data().correoPrincipal,
              correoSecundario: e.payload.doc.data().correoSecundario,
              edad: e.payload.doc.data().edad,
              sexo: e.payload.doc.data().sexo,
              identidadGenero: e.payload.doc.data().identidadGenero,
              orientacionSexual: e.payload.doc.data().orientacionSexual,
              estrato: e.payload.doc.data().estrato,
              estadoCivil: e.payload.doc.data().estadoCivil,
              

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
            usaReddit: e.payload.doc.data().usaReddit,
            usuarioReddit: e.payload.doc.data().usuarioReddit,
            usaInstagram: e.payload.doc.data().usaInstagram,
            usuarioInstagram: e.payload.doc.data().usuarioInstagram,
            usaFacebook: e.payload.doc.data().usaFacebook,
            usuarioFacebook: e.payload.doc.data().usuarioFacebook,
            usaTwitter: e.payload.doc.data().usaTwitter,
            usuarioTwitter: e.payload.doc.data().usuarioTwitter,
            usaTiktok: e.payload.doc.data().usaTiktok,
            usuarioTiktok: e.payload.doc.data().usuarioTiktok,
            
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
        console.log(this.collectionInfoBasica.data[0].nombre)
        console.log('this.collectionInfoBasica.data[0].nombre')
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
      

      usaReddit: this.collectionInfoSociodemografica.data[0].usaReddit,
      usuarioReddit: this.collectionInfoSociodemografica.data[0].usuarioReddit,
      usaInstagram: this.collectionInfoSociodemografica.data[0].usaInstagram,
      usuarioInstagram: this.collectionInfoSociodemografica.data[0].usuarioInstagram,
      usaFacebook: this.collectionInfoSociodemografica.data[0].usaFacebook,
      usuarioFacebook: this.collectionInfoSociodemografica.data[0].usuarioFacebook,
      usaTwitter: this.collectionInfoSociodemografica.data[0].usaTwitter,
      usuarioTwitter: this.collectionInfoSociodemografica.data[0].usuarioTwitter,
      usaTiktok: this.collectionInfoSociodemografica.data[0].usaTiktok,
      usuarioTiktok: this.collectionInfoSociodemografica.data[0].usuarioTiktok,

    });

    
    this.idFirebaseActualizarSocio = this.collectionInfoSociodemografica.data[0].idFirebase;
    this.actualizar = true;


  }

  abrirEditarInfoBasica(){

    this.registroForm.setValue({

      nombre: this.collectionInfoBasica.data[0].nombre,      
      apellido1: this.collectionInfoBasica.data[0].apellido1,
      apellido2: this.collectionInfoBasica.data[0].apellido2,
      tipoDoc: this.collectionInfoBasica.data[0].tipoDoc,
      numDoc: this.collectionInfoBasica.data[0].numDoc,
      lugarNacimiento: this.collectionInfoBasica.data[0].lugarNacimiento,
      telefonoContacto: this.collectionInfoBasica.data[0].telefonoContacto,
      correoPrincipal: this.collectionInfoBasica.data[0].correoPrincipal,
      correoSecundario: this.collectionInfoBasica.data[0].correoSecundario,
      edad: this.collectionInfoBasica.data[0].edad,
      sexo: this.collectionInfoBasica.data[0].sexo,
      identidadGenero: this.collectionInfoBasica.data[0].identidadGenero,
      orientacionSexual: this.collectionInfoBasica.data[0].orientacionSexual,
      estrato: this.collectionInfoBasica.data[0].estrato,
      estadoCivil: this.collectionInfoBasica.data[0].estadoCivil


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
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cambios Realizados',
                  showConfirmButton: false,
                  timer: 3000
                })
               
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

                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cambios Realizados',
                  showConfirmButton: false,
                  timer: 3000
                })
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




