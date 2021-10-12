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

  getInfoBasicaCorreo(correo: string){
    console.log(correo);
    return this.firestore.collection("infobasica", ref => ref.where("correoPrincipal","==",correo)).snapshotChanges();
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


  
  // para la gestion de eps
  getEPS(){
    return this.firestore.collection("eps").snapshotChanges();
  }
  
  createEPS(eps:any){
    return this.firestore.collection("eps").add(eps);
  }

  updateEPS(id:any, eps:any){
    return this.firestore.collection("eps").doc(id).update(eps);
  }

  deleteEPS(id:any){
    return this.firestore.collection("eps").doc(id).delete();
  }

  getEPSCorreo(correo: string){
    console.log(correo);
    return this.firestore.collection("eps", ref => ref.where("correoPrincipal","==",correo)).snapshotChanges();
  }
//para la gestion de profesionales

getProfesionales(){
  return this.firestore.collection("profesional").snapshotChanges();
}

createProfesional(profesional:any){
  return this.firestore.collection("profesional").add(profesional);
}

updateProfesional(id:any, profesional:any){
  return this.firestore.collection("profesional").doc(id).update(profesional);
}

deleteProfesional(id:any){
  return this.firestore.collection("profesional").doc(id).delete();
}

getProfesionalCorreoEntidad(correo: string){
  console.log(correo);
  return this.firestore.collection("profesional", ref => ref.where("entidadDeSalud","==",correo)).snapshotChanges();
}

getProfesionalCorreo(correo: string){
  console.log(correo+'llega bien aqui');
  return this.firestore.collection("profesional", ref => ref.where("correoPrincipal","==",correo)).snapshotChanges();
}

//para la gestion de profesionales

getEtiquetas(){
  return this.firestore.collection("etiquetas").snapshotChanges();
}

createEtiqueta(etiqueta:any){
  return this.firestore.collection("etiquetas").add(etiqueta);
}

updateEtiqueta(id:any, etiqueta:any){
  return this.firestore.collection("etiquetas").doc(id).update(etiqueta);
}

deleteEtiqueta(id:any){
  return this.firestore.collection("etiquetas").doc(id).delete();
}

}
