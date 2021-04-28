import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { JugadorId } from 'src/app/interfaces';
import { EntrenamientoPage } from '../entrenamiento.page';
import firebase from 'firebase/app';
import { FileChooser } from '@ionic-native/file-chooser/ngx';


@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage implements OnInit {

  numEntrenamiento: string;
  jugadoresId: Array<JugadorId>;
  idEntrenamiento: string;
  entFinalizado: string;
  fechaEntrenamiento: string;
  checkAsistencia: boolean;


  constructor(private dataService: DataService, private fileChooser: FileChooser) {
    this.numEntrenamiento = this.dataService.numEntrenamiento
    this.jugadoresId = []
    this.idEntrenamiento = this.dataService.idEntrenamiento
    this.entFinalizado = this.dataService.finEntrenamiento
    this.fechaEntrenamiento = this.dataService.fechaEntrenamiento
    this.checkAsistencia = false
  }

  listaJugadores(){

//Cambiar icono
    if((document.getElementById('iconAsistencia') as HTMLIonIconElement).name == 'chevron-forward-outline'){
      (document.getElementById('iconAsistencia') as HTMLIonIconElement).name = 'chevron-down-outline'
    } else {
      (document.getElementById('iconAsistencia') as HTMLIonIconElement).name = 'chevron-forward-outline'
    }

//Mostrar lista de jugadores
    if(document.getElementById('listaAsistencia').style.visibility == 'hidden'){
      document.getElementById('listaAsistencia').style.visibility = 'visible'
    } else {
      document.getElementById('listaAsistencia').style.visibility = 'hidden'
    }

  }

  cambiarIcono(){
    if((document.getElementById('iconAsistencia') as HTMLIonIconElement).name == 'chevron-forward-outline'){
      (document.getElementById('iconAsistencia') as HTMLIonIconElement).name = 'chevron-down-outline'
    } else {
      (document.getElementById('iconAsistencia') as HTMLIonIconElement).name = 'chevron-forward-outline'
    }
  }

  cargarJugadores(){

    firebase.firestore().collection(this.dataService.getPathJugadores()).orderBy("posicion").onSnapshot((querySnapshot) => {
      var jugact = [];
      querySnapshot.forEach((doc) =>{
        jugact.push({id: doc.id,
          nombre: doc.data().nombre, 
          apellidos: doc.data().apellidos, 
          apodo: doc.data().apodo, 
          dorsal: doc.data().dorsal, 
          posicion: doc.data().posicion,
          edad: doc.data().edad})
      });

      for(var i = 0; jugact.length > i; i++){
        if(jugact[i].posicion == 'aPOR'){
          jugact[i].posicion = "POR"
        }
        if(jugact[i].posicion == 'bDEF'){
          jugact[i].posicion = "DEF"
        }
        if(jugact[i].posicion == 'cMED'){
          jugact[i].posicion = "MED"
        }
        if(jugact[i].posicion == 'dDEL'){
          jugact[i].posicion = "DEL"
        }
      }

      this.jugadoresId = jugact

    })

  }

  cambiarTickAsiste(id){

    (document.getElementById('falta' + id) as HTMLIonCheckboxElement).checked = false

  }

  cambiarTickFalta(id){

    (document.getElementById('asiste' + id) as HTMLIonCheckboxElement).checked = false

  }
  ngOnInit() {
    this.cargarJugadores()
  }

  guardarCambios(){
    //EntrenamientoFinalizado
    var entFinalizado = false
    var miBool = Boolean(this.entFinalizado)

    if((document.getElementById('entFinalizado') as HTMLIonToggleElement).checked == true && miBool == false){
      entFinalizado = true
      firebase.firestore().collection(this.dataService.getPathEntrenamientos()).doc(this.idEntrenamiento).update({finalizado: entFinalizado})
    } 
    if((document.getElementById('entFinalizado') as HTMLIonToggleElement).checked == false && miBool == true){
      firebase.firestore().collection(this.dataService.getPathEntrenamientos()).doc(this.idEntrenamiento).update({finalizado: entFinalizado})
    } 




    //Campo Asistencia

    // this.updateAsistencia()

    // for(var i = 0; i < this.jugadoresId.length; i++){
    //   if((document.getElementById('asiste' + this.jugadoresId[i].id) as HTMLIonCheckboxElement).checked){
    //     this.dataService.pathJugadoresEstadistica = this.dataService.pathJugadores + this.jugadoresId[i].id
    //     firebase.firestore().collection(this.dataService.getPathJugadores()).doc(this.jugadoresId[i].id).update({asiste: entFinalizado})
    //   }
    //   if((document.getElementById('falta' + this.jugadoresId[i].id) as HTMLIonCheckboxElement).checked){
    //     firebase.firestore().collection(this.dataService.getPathJugadores()+this.jugadoresId[i].id+'/estadisticas').doc(idEstadistica).update({falta: entFinalizado})
    //   }
    // }

  }

  elegirArchivo(){
    this.fileChooser.open()
  }

  // updateAsistencia() {

  //   var docId = ""

    


    
  //   for(var i = 0; this.jugadoresId.length > i; i++){ //Recorrer los idJugadores para obtener los checkboc de cad uno y actualizar en bbdd asistencias y faltas
      
  //     console.log(this.jugadoresId[i].id)

  //     //Obtener Id estadisticas para la ruta
  //     firebase.firestore().collection(this.dataService.pathJugadores + this.jugadoresId[i].id + '/estadisticas').onSnapshot((querySnapshot) => {
  //       var jugact = [];
  //       querySnapshot.forEach((doc) =>{
  //         jugact.push({id: doc.id})
  //       });
  
  //       docId = jugact[0].id

  //       console.log('docid ==> ' + docId)
  
  //     })

  //     //Si no está marcado...
  //     if((document.getElementById('asiste' + this.jugadoresId[i].id) as HTMLIonCheckboxElement).checked == false){
  //       firebase.firestore().collection(this.dataService.pathJugadores + this.jugadoresId[i].id + '/estadisticas').doc(docId).update({
  //         falta: firebase.firestore.FieldValue.arrayUnion(this.fechaEntrenamiento)
  //       });
  //       firebase.firestore().collection(this.dataService.pathJugadores + this.jugadoresId[i].id + '/estadisticas').doc(docId).update({
  //         asiste: firebase.firestore.FieldValue.arrayRemove(this.fechaEntrenamiento)
  //       });
  //     }
  
  //     //Si está marcado...
  //     if((document.getElementById('asiste' + this.jugadoresId[i].id) as HTMLIonCheckboxElement).checked == true){
  //       firebase.firestore().collection(this.dataService.pathJugadores + this.jugadoresId[i].id + '/estadisticas').doc(docId).update({
  //         asiste: firebase.firestore.FieldValue.arrayUnion(this.fechaEntrenamiento)
  //       });
  //       firebase.firestore().collection(this.dataService.pathJugadores + this.jugadoresId[i].id + '/estadisticas').doc(docId).update({
  //         falta: firebase.firestore.FieldValue.arrayRemove(this.fechaEntrenamiento)
  //       });
  //     }
  //   }
  // }

  async updateAsistencia(jugadorId) {

    var docId = ""
    var asistencia = []
    var falta = []
    var checkedAsist = ""

    await firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').onSnapshot((querySnapshot) => {
      var jugact = [];
      querySnapshot.forEach((doc) =>{
        jugact.push({id: doc.id,
        asiste: doc.data().asiste,
        falta: doc.data().falta})
      });

      docId = jugact[0].id
      asistencia = jugact[0].asiste
      falta = jugact[0].falta

      console.log('docid ==> ' + docId + 'asistencia ==> ' + asistencia + 'falta ==> ' + falta)


      for(var i = 0; i<asistencia.length; i++){
        if(asistencia[i] == this.fechaEntrenamiento){
          checkedAsist = "asiste"
        }
      }

      for(var i = 0; i<falta.length; i++){
        if(falta[i] == this.fechaEntrenamiento){
          checkedAsist = "falta"
        }
      }

      //Si no se ha registrado aun esta fecha
      if (checkedAsist != 'asiste' && checkedAsist != 'falta') {

        //Si no está marcado...
        if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == false) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(docId).update({
            falta: firebase.firestore.FieldValue.arrayUnion(this.fechaEntrenamiento)
          });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(docId).update({
            asiste: firebase.firestore.FieldValue.arrayRemove(this.fechaEntrenamiento)
          });
        }
    
        //Si está marcado...
        if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == true) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(docId).update({
            asiste: firebase.firestore.FieldValue.arrayUnion(this.fechaEntrenamiento)
          });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(docId).update({
            falta: firebase.firestore.FieldValue.arrayRemove(this.fechaEntrenamiento)
          });
        }
      }

      //Si se ha registrado esta fecha en asistencia se elimina de asistencia y se añade en falta
      if (checkedAsist == 'asiste') {

        //Si no está marcado...
        if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == false) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(docId).update({
            falta: firebase.firestore.FieldValue.arrayUnion(this.fechaEntrenamiento)
          });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(docId).update({
            asiste: firebase.firestore.FieldValue.arrayRemove(this.fechaEntrenamiento)
          });
        }
      }

      //Si se ha registrado esta fecha en falta se elimina de falta y se añade en asistencia
      if (checkedAsist == 'falta') {
    
        //Si está marcado...
        if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == true) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(docId).update({
            asiste: firebase.firestore.FieldValue.arrayUnion(this.fechaEntrenamiento)
          });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(docId).update({
            falta: firebase.firestore.FieldValue.arrayRemove(this.fechaEntrenamiento)
          });
        }
      }

    })

      //Obtener Id estadisticas para la ruta
      // await firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').onSnapshot((querySnapshot) => {
      //   var jugact = [];
      //   querySnapshot.forEach((doc) =>{
      //     jugact.push({id: doc.id})
      //   });
  
      //   docId = jugact[0].id

      //   console.log('docid ==> ' + docId)
  
      // })

      

      // //Si no está marcado...
      // if((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == false){
      //   firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(docId).update({
      //     falta: firebase.firestore.FieldValue.arrayUnion(this.fechaEntrenamiento)
      //   });
      //   firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(docId).update({
      //     asiste: firebase.firestore.FieldValue.arrayRemove(this.fechaEntrenamiento)
      //   });
      // }
  
      // //Si está marcado...
      // if((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == true){
      //   firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(docId).update({
      //     asiste: firebase.firestore.FieldValue.arrayUnion(this.fechaEntrenamiento)
      //   });
      //   firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(docId).update({
      //     falta: firebase.firestore.FieldValue.arrayRemove(this.fechaEntrenamiento)
      //   });
      // }
    
  }

  checkearAsistencia(jugadorId){
    var asistencia = []
    this.checkAsistencia = false

    //Bucle para coger asistencia de estadisticas y saber si checkear el checkbox
    firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').onSnapshot((querySnapshot) => {
      var jugact = [];
      querySnapshot.forEach((doc) =>{
        jugact.push({asiste: doc.data().asiste})
      });

      asistencia = jugact[0].asiste

      console.log('asistencia ==> ' + asistencia)

      for(var i = 0; i<asistencia.length; i++){
        if(asistencia[i] == this.fechaEntrenamiento){
          this.checkAsistencia = true
        }
      }

    })

    // for(var i = 0; i<asistencia.length; i++){
    //   if(asistencia[i] == this.fechaEntrenamiento){
    //     miBool = true
    //   }
    // }

    return this.checkAsistencia
  }

}
