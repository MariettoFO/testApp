import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { JugadorId } from 'src/app/interfaces';
import { EntrenamientoPage } from '../entrenamiento.page';
import firebase from 'firebase/app';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AngularFireStorage } from '@angular/fire/storage';


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


  constructor(private dataService: DataService, private fileChooser: FileChooser, private fileOpener: FileOpener, private fireStorage: AngularFireStorage) {
    this.numEntrenamiento = this.dataService.numEntrenamiento
    this.jugadoresId = []
    this.idEntrenamiento = this.dataService.idEntrenamiento
    this.entFinalizado = this.dataService.finEntrenamiento
    this.fechaEntrenamiento = this.dataService.fechaEntrenamiento
    this.checkAsistencia = false
  }

  ngOnInit() {
    this.cargarJugadores()
  }

  inputCambiado(e){
    console.log('hola', e.target.files[0])
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

      this.dataService.asistencia = []

      for(var x = 0; x<this.jugadoresId.length; x++){
        firebase.firestore().collection(this.dataService.pathJugadores + this.jugadoresId[x].id + '/estadisticas').get().then((querySnapshot) => {
          var estact = [];
          querySnapshot.forEach((doc) =>{
            this.dataService.asistencia.push({id: doc.id, asiste: doc.data().asiste, falta: doc.data().falta})
  
          })
  
          console.log(this.dataService.asistencia)
  
        })
      }

    })

  }

  guardarCambios(){
    try{

    
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

    for(var i = 0; this.jugadoresId.length > i; i++){
      this.updateAsistencia(this.jugadoresId[i].id)
    }

  }catch(err){
    console.log(err)
  }

  }

  elegirArchivo(){
    // this.fileChooser.open().then(uri => console.log(uri)).catch(e => console.log(e));
    this.fileOpener.open('path/to/file.pdf', 'application/pdf')
  .then(() => console.log('File is opened'))
  .catch(e => console.log('Error opening file', e));

// this.fileOpener.showOpenWithDialog('path/to/file.pdf', 'application/pdf')
//   .then(() => console.log('File is opened'))
//   .catch(e => console.log('Error opening file', e));
  }

  async updateAsistencia(jugadorId) {

    var num = 0
    var checkedAsist = ""
    var bool = false

    //Para saber posicion del array de asistencia
    for(var i = 0; i<this.jugadoresId.length; i++){
      if(this.jugadoresId[i].id == jugadorId){
        num = i
      }
    }
      //Comprobar si existe la fecha en asiste
      for(var i = 0; i<this.dataService.asistencia[num].asiste.length; i++){
        if(this.dataService.asistencia[num].asiste[i] == this.fechaEntrenamiento){
          checkedAsist = "asiste"
        }
      }

      //Comprobar si existe la fecha en falta
      for(var i = 0; i<this.dataService.asistencia[num].falta.length; i++){
        if(this.dataService.asistencia[num].falta[i] == this.fechaEntrenamiento){
          checkedAsist = "falta"
        }
      }

      //Si no se ha registrado aun esta fecha
      if (checkedAsist != 'asiste' && checkedAsist != 'falta') {

        //Si no está marcado...
        if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == false && bool == false) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
            falta: firebase.firestore.FieldValue.arrayUnion(this.fechaEntrenamiento)
          });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
            asiste: firebase.firestore.FieldValue.arrayRemove(this.fechaEntrenamiento)
          });
          bool = true
        }
    
        //Si está marcado...
        if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == true && bool == false) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
            asiste: firebase.firestore.FieldValue.arrayUnion(this.fechaEntrenamiento)
          });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
            falta: firebase.firestore.FieldValue.arrayRemove(this.fechaEntrenamiento)
          });
          bool = true
        }
      }

      //Si se ha registrado esta fecha en asistencia se elimina de asistencia y se añade en falta
      if (checkedAsist == 'asiste' && bool == false) {

        //Si no está marcado...
        if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == false) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
            falta: firebase.firestore.FieldValue.arrayUnion(this.fechaEntrenamiento)
          });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
            asiste: firebase.firestore.FieldValue.arrayRemove(this.fechaEntrenamiento)
          });
          bool = true
        }
      }

      //Si se ha registrado esta fecha en falta se elimina de falta y se añade en asistencia
      if (checkedAsist == 'falta' && bool == false) {
    
        //Si está marcado...
        if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == true) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
            asiste: firebase.firestore.FieldValue.arrayUnion(this.fechaEntrenamiento)
          });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
            falta: firebase.firestore.FieldValue.arrayRemove(this.fechaEntrenamiento)
          });
          bool = true
        }
      }

    
  }

  checkearAsistencia(){

    //Bucle para coger asistencia de estadisticas y saber si checkear el checkbox
    if(this.checkAsistencia == false){
      this.checkAsistencia = true
      for(var x = 0; x<this.dataService.asistencia.length; x++){
            for(var i = 0; i<this.dataService.asistencia[x].asiste.length; i++){
              if(this.dataService.asistencia[x].asiste[i] == this.fechaEntrenamiento){
                (document.getElementById('asiste' + this.jugadoresId[x].id) as HTMLIonCheckboxElement).checked = true
              }
            }

      }
    }
  }

}
