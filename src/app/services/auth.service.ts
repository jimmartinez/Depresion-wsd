import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth
    ) { auth.onAuthStateChanged(user=>{
      if(user){
        console.log('Usuario logeado en: ',user);
      }else{
        console.log('Usuario no logeado');
      }
    })
   }

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
