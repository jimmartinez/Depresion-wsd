import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userEmail: string;
  constructor(
    private auth: AngularFireAuth,
    public router:Router
    ) {  }
   



    crearUsuario(email: any, contra: any){

      this.auth.createUserWithEmailAndPassword(email,contra).then(cred =>{
      });

    }

    cerrarSesion(){
      this.auth.signOut().then(()=> {
      });
    }

    iniciarSesion(email: any, contra: any){
      this.auth.signInWithEmailAndPassword(email,contra).then(cred =>{
      });
    }





}
