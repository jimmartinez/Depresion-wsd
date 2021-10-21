import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userEmail: string;
  creado=false;

  constructor(
    private auth: AngularFireAuth,
    public router:Router
    ) {  }
   



    crearUsuario(email: any, contra: any){


     this.auth.createUserWithEmailAndPassword(email,contra);



    }

    cerrarSesion(){
      this.auth.signOut().then(()=> {   
        console.log('sesion finalizada')
      });
    }

    iniciarSesion(email: any, contra: any){
      this.auth.signInWithEmailAndPassword(email,contra).then(cred =>{
      });
    }

    cambiarContra(email: any){
      this.auth.sendPasswordResetEmail(email);
    }





}
