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
    return this.firestore.collection("infobasica", ref => ref.where("correoPrincipal","==",correo)).snapshotChanges();
  }

  // para los infosociodemograficas
  getInfoSociodemografica(){
    return this.firestore.collection("infoSociodemografica").snapshotChanges();
  }
  
  createInfoSociodemografica(infoSociodemografica:any){
    return this.firestore.collection("infoSociodemografica").add(infoSociodemografica);
  }

  updateInfoSociodemografica(id:any, infoSociodemografica:any){
    return this.firestore.collection("infoSociodemografica").doc(id).update(infoSociodemografica);
  }

  deleteInfoSociodemografica(id:any){
    return this.firestore.collection("infoSociodemografica").doc(id).delete();
  }

  getInfoSociodemograficaCorreo(correo: string){
    console.log(correo);
    return this.firestore.collection("infoSociodemografica", ref => ref.where("correoPrincipal","==",correo)).snapshotChanges();
  }  


}
