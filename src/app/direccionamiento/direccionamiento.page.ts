import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RegistroService } from '../services/registro.service';

@Component({
  selector: 'app-direccionamiento',
  templateUrl: './direccionamiento.page.html',
  styleUrls: ['./direccionamiento.page.scss'],
})
export class DireccionamientoPage implements OnInit {


  correo: any;
  collectionUsuario = {count: 20, data: []};


  constructor(    
    public auth: AngularFireAuth,
    public router: Router,
    private registroService: RegistroService
    ) {

    
   }



  ngOnInit() {




    //verifica que este autenticado o si no lo devuelve al login
    setTimeout(() => {

      this.auth.onAuthStateChanged(user=>{
        if(user){
          this.correo = user.email;
        }else{
          this.router.navigateByUrl('login');
        }
      })
    }, 5000);


    //obtener rol de paciente si es el caso
    setTimeout(() => {

      this.registroService.getInfoBasicaCorreo(this.correo).subscribe(resp=>{
        this.collectionUsuario.data = resp.map( (e:any)=>{
          return{
      
            correoPrincipal: e.payload.doc.data().correoPrincipal,
            rol: e.payload.doc.data().rol,
            
            idFirebase: e.payload.doc.id,
  
          }
        })
      },
      error=>{
        console.log(error);
      }
      );
    
    }, 7000);

    
    //obtener rol de EPS si es el caso
    setTimeout(() => {
try{
  if(this.collectionUsuario.data[0].rol){

  }else{
  }
}catch(error){

 
    this.registroService.getEPSCorreo(this.correo).subscribe(resp=>{
      this.collectionUsuario.data = resp.map( (e:any)=>{
        return{
    
          correoPrincipal: e.payload.doc.data().correoPrincipal,
          rol: e.payload.doc.data().rol,
          
          idFirebase: e.payload.doc.id,
  
        }
      })
    },
    error=>{
      console.log(error);
    }
    );
}
    
    }, 8000);



    setTimeout(() => {

      try {
        if(this.collectionUsuario.data[0].rol){
  
        }else{
        }
  
    } catch (error) {
  //obtener rol profesional si es el caso
  
  this.registroService.getProfesionalCorreo(this.correo).subscribe(resp=>{
    this.collectionUsuario.data = resp.map( (e:any)=>{
      return{
  
        correoPrincipal: e.payload.doc.data().correoPrincipal,
        rol: e.payload.doc.data().rol,
        
        idFirebase: e.payload.doc.id,
  
      }
    })
  },
  error=>{
    console.log(error);
  }
  );
  
      
    }
      
    }, 9000);

    //AQUI FINALMENTE SE REDIRIGE
    setTimeout(() => {
      if(this.collectionUsuario.data[0].rol == 'paciente' ){
        this.router.navigateByUrl('paciente');
      }else{
        if(this.collectionUsuario.data[0].rol == 'eps' ){
          this.router.navigateByUrl('eps');
        }else{
          if(this.collectionUsuario.data[0].rol == 'profesional' ){
            this.router.navigateByUrl('profesional');
          }

        }
      }

    }, 10000);



  }






}
