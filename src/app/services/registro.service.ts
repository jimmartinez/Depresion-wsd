import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {


  constructor(
    private firestore: AngularFirestore
  ) { }

// para los infobasicas
  getInfobasica(){
    return this.firestore.collection("infobasica").snapshotChanges();
  }

  getInfoBasicasEnviado(){
    return this.firestore.collection('infobasica', ref => ref.where('estado','==','enviado')).snapshotChanges();
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

}
