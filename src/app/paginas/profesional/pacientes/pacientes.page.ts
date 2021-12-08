import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {

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

  handleSearch(value:string){
    this.filtro_valor = value; 
  }

  filtro_valor='';
  
  

  collectionPacientes = {count: 20, data: []};
  collectionFormularios = {count: 20, data: []};

  collectionInfoSociodemografica = {count: 20, data: []};
  collectionInfoBasica = {count: 20, data: []};

  asignacionForm: FormGroup;
  pacienteVistaForm: FormGroup;
  infosociodemograficaForm: FormGroup;
  registroForm: FormGroup;


  nombreProfesional ='cargando';

  
  mostrarBasica = true;
  mostrarSocio = false;
  mostrar = false;

  correoPacienteSeleccionado: any;
  

  constructor(
    public fb: FormBuilder,
    private registroService: RegistroService,
    public app: AppComponent
  ) { }

  ngOnInit() {
    this.mostrar=true;

    setInterval(() => {
      this.nombreProfesional = this.app.getNombre();
    }, 1000);


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


    setTimeout(() => {

      this.registroService.getFormularios().subscribe(resp=>{
        this.collectionFormularios.data = resp.map( (e:any)=>{
          return{
            
            nombre: e.payload.doc.data().nombre,
            tipo:e.payload.doc.data().tipo,
            
            idFirebase: e.payload.doc.id
          }
        })
      },
      error=>{
        console.log(error);
      }
      );
      

    }, 4000);

        
    this.asignacionForm = this.fb.group({

      nombreFormulario: [,Validators.required],
      tipoFormulario: ['',Validators.required],
      correoPaciente: ['',Validators.required],


    })


    
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
      entidadSalud: ['',Validators.required],


    })

    






  }

  openAsignacion(item:any){

    this.correoPacienteSeleccionado = item.correoPrincipal;


    document.getElementById('asignacion').style.display='block';


  }

  asignar(formulario:any){

    this.asignacionForm.setValue({

      
      nombreFormulario: formulario.nombre,
      tipoFormulario: formulario.tipo,
      correoPaciente: this.correoPacienteSeleccionado,

    });

        
    this.registroService.createAsignacion(this.asignacionForm.value).then(resp=>{
    }).catch(error => {
      console.log('error'); 
    })

    document.getElementById('asignacion').style.display='none';

  }

  openVerPaciente(item: any){

      this.registroService.getInfoBasicaCorreo(item.correoPrincipal).subscribe(resp=>{
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
            entidadSalud: e.payload.doc.data().entidadSalud,
            autorizacionContacto: e.payload.doc.data().autorizacionContacto,
            rol: e.payload.doc.data().rol,
            
  
  
            idFirebase: e.payload.doc.id,
  
          }
        })
      },
      error=>{
        console.log(error);
      }
      );
    

  
      
    this.registroService.getInfoSociodemograficaCorreo(item.correoPrincipal).subscribe(resp=>{
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


    //setearlo a los input
setTimeout(() => {
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
}, 5000);

setTimeout(() => {
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
    entidadSalud: this.collectionInfoBasica.data[0].entidadSalud,

    

  });
}, 5500);






    document.getElementById('verPaciente').style.display='block';

  }

  goToBasica() {
    this.slides.slideTo(0);
  }

  goToSocio() {
    this.slides.slideTo(1);
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



}
