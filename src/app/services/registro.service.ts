import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';




@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  correoUsuario: any;
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    ) {

     }

// para los infobasicas
  getInfobasica(){
    return this.firestore.collection("infobasica").snapshotChanges();
  }

  getInfoBasicaUsuario(){
    return this.firestore.collection('infobasica', ref => ref.where('correoPrincipal','==','enviado')).snapshotChanges();
  }
  
  createInfoBasica(infobasica:any){
    return this.firestore.collection("infobasica").add(infobasica);
  }

  updateInfoBasica(id:any, infobasica:any){
    return this.firestore.collection("infobasica").doc(id).update(infobasica);
  }

  deleteInfoBasica(id:any){
    return this.firestore.collection("infobasica").doc(id).delete();
  }

  nombreActual(correo: string){
    console.log(correo);
    return this.firestore.collection("infobasica", ref => ref.where("correoPrincipal","==",correo)).snapshotChanges();
  }

}
