import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import firebase from 'firebase/app';
import { DataService } from '../data.service';
import { EntrenamientoModalPage } from '../entrenamiento-modal/entrenamiento-modal.page';
import { EntrenamientoId } from '../interfaces';

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.page.html',
  styleUrls: ['./entrenamiento.page.scss']
})
export class EntrenamientoPage implements OnInit {

  selectSegment: string;
  entrenamientoSelect: string;
  entrenamientoId: Array<EntrenamientoId>
  finalizados: Array<EntrenamientoId>
  programados: Array<EntrenamientoId>

  constructor(private modalCtrl: ModalController, public deleteAlert: AlertController, private dataService: DataService) {
    this.selectSegment = 'todos'
    this.entrenamientoSelect = ''
    this.entrenamientoId = []
    this.finalizados = []
    this.programados = []

   }

  ngOnInit() {
    this.getEntrenamientos()
  }

  async infoAlert(){
    await this.deleteAlert.create({
      header: "Ayuda",
      message: "En esta página podrás añadir entrenamientos y gestionar los eventos del mismo.",
      buttons:[{
        text:'¡Entendido!',
        // handler:()=>{
        //   this.navCtr.navigateBack(['entrenamiento-modal'])
        // }
      }]
    }).then(alert => alert.present())
  }

  doRefresh(event){
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

  segmentChanged(event){
    this.selectSegment = event.detail.value.toLowerCase();
  }

  getFinalizadoColor(finalizado){
    
    switch(finalizado){
      case true:
        return 'green'

      case false:
        return 'orange'
    }

  }

  async abrirModalEntrenamiento(){
    // await console.log('hola')
    const modal = await this.modalCtrl.create({
      component: EntrenamientoModalPage,
      componentProps:{
        equipo: 'CD San Roque EFF',
        icono: '../../assets/icon/favicon.png'
      }
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();

    console.log('retorno del modal', data);
  }

  getEntrenamientoSelect(entrenamiento, id, finalizado, fecha){
    this.dataService.numEntrenamiento = entrenamiento
    this.dataService.idEntrenamiento = id
    this.dataService.finEntrenamiento = finalizado
    this.dataService.fechaEntrenamiento = fecha

    return this.dataService.numEntrenamiento, this.dataService.idEntrenamiento, this.dataService.finEntrenamiento, this.dataService.fechaEntrenamiento
  }

  getEntrenamientos(){
    firebase.firestore().collection(this.dataService.getPathEntrenamientos()).orderBy('numero').onSnapshot((querySnapshot) => {
      var entact = [];
      querySnapshot.forEach((doc) =>{
        entact.push({id: doc.id,
          numero: doc.data().numero, 
          fecha: doc.data().fecha, 
          hora: doc.data().hora,
          finalizado: doc.data().finalizado})
      });

      this.entrenamientoId = entact
      this.dataService.entrenamientos = entact
    })

    firebase.firestore().collection(this.dataService.getPathEntrenamientos()).where('finalizado', '==', true).orderBy('numero').onSnapshot((querySnapshot) => {
      var entact = [];
      querySnapshot.forEach((doc) =>{
        entact.push({id: doc.id,
          numero: doc.data().numero, 
          fecha: doc.data().fecha, 
          hora: doc.data().hora,
          finalizado: doc.data().finalizado})
      });

      this.finalizados = entact
    })

    firebase.firestore().collection(this.dataService.getPathEntrenamientos()).where('finalizado', '==', false).orderBy('numero').onSnapshot((querySnapshot) => {
      var entact = [];
      querySnapshot.forEach((doc) =>{
        entact.push({id: doc.id,
          numero: doc.data().numero, 
          fecha: doc.data().fecha, 
          hora: doc.data().hora,
          finalizado: doc.data().finalizado})
      });

      this.programados = entact
    })

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

      this.dataService.jugadoresId = jugact

      this.dataService.asistencia = []

      for(var x = 0; x<this.dataService.jugadoresId.length; x++){
        firebase.firestore().collection(this.dataService.pathJugadores + this.dataService.jugadoresId[x].id + '/estadisticas').get().then((querySnapshot) => {
          var estact = [];
          querySnapshot.forEach((doc) =>{
            this.dataService.asistencia.push({id: doc.id, asiste: doc.data().asiste, falta: doc.data().falta})
  
          })
  
          console.log(this.dataService.asistencia)
  
        })
      }

    })

    return this.entrenamientoId

  }

  async borrarEntrenamiento(idEntrenamiento){
    var id = ""
    var i = 0
    this.getEntrenamientos()

    for(i = 0; this.entrenamientoId.length > i; i++){
      if(this.entrenamientoId[i].id == idEntrenamiento) {
        id = this.entrenamientoId[i].id
        break
      }
    }
    const alerta = await this.deleteAlert.create({
      header: 'Alerta',
      subHeader: 'Ten cuidado',
      message: 'Va a borrar el entrenamiento nº' + this.entrenamientoId[i].numero + ' , perderá todos los datos de este entrenamiento. ¿Desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Borrar',
          cssClass: 'borrar',
          handler: () => {
            for(var x = 0; this.dataService.jugadoresId.length > x; x++){
              this.borrarEntrenamientoJugador(this.dataService.jugadoresId[x].id, this.entrenamientoId[i].fecha)
            }
            firebase.firestore().collection(this.dataService.getPathEntrenamientos()).doc(id).delete()
            console.log('Confirm Okay');
          }
        }] 
    })

    await alerta.present()
  }

  borrarEntrenamientoJugador(jugadorId, fechaEntrenamiento){
    // for(var i = 0; this.dataService.jugadoresId.length > i; i++){
    //   var path = this.dataService.pathJugadores + this.dataService.jugadoresId[i].id + '/estadisticas' + idEntrenamiento
    //   firebase.firestore().collection(this.dataService.pathJugadores + this.dataService.jugadoresId[i].id + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
    //     falta: firebase.firestore.FieldValue.arrayRemove(fechaEntrenamiento)
    //   });
    // }

    // var docId = ""
    var num = 0
    // var asistencia = []
    // var falta = []
    var checkedAsist = ""
    var bool = false

    //Para saber posicion del array de asistencia
    for(var i = 0; i<this.dataService.jugadoresId.length; i++){
      if(this.dataService.jugadoresId[i].id == jugadorId){
        num = i
      }
    }
      //Comprobar si existe la fecha en asiste
      for(var i = 0; i<this.dataService.asistencia[num].asiste.length; i++){
        if(this.dataService.asistencia[num].asiste[i] == fechaEntrenamiento){
          checkedAsist = "asiste"
        }
      }

      //Comprobar si existe la fecha en falta
      for(var i = 0; i<this.dataService.asistencia[num].falta.length; i++){
        if(this.dataService.asistencia[num].falta[i] == fechaEntrenamiento){
          checkedAsist = "falta"
        }
      }

      //Si no se ha registrado aun esta fecha
      // if (checkedAsist != 'asiste' && checkedAsist != 'falta') {

      //   //Si no está marcado...
      //   // if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == false && bool == false) {
      //   //   firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
      //   //     falta: firebase.firestore.FieldValue.arrayUnion(fechaEntrenamiento)
      //   //   });
      //   //   firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
      //   //     asiste: firebase.firestore.FieldValue.arrayRemove(fechaEntrenamiento)
      //   //   });
      //   //   bool = true
      //   // }
    
      //   // //Si está marcado...
      //   // if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == true && bool == false) {
      //   //   firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
      //   //     asiste: firebase.firestore.FieldValue.arrayUnion(fechaEntrenamiento)
      //   //   });
      //   //   firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
      //   //     falta: firebase.firestore.FieldValue.arrayRemove(fechaEntrenamiento)
      //   //   });
      //   //   bool = true
      //   // }
      // }

      //Si se ha registrado esta fecha en asistencia se elimina de asistencia y se añade en falta
      if (checkedAsist == 'asiste' && bool == false) {

        //Si no está marcado...
        // if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == false) {
          // firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
          //   falta: firebase.firestore.FieldValue.arrayUnion(fechaEntrenamiento)
          // });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
            asiste: firebase.firestore.FieldValue.arrayRemove(fechaEntrenamiento)
          });
          bool = true
        // }
      }

      //Si se ha registrado esta fecha en falta se elimina de falta y se añade en asistencia
      if (checkedAsist == 'falta' && bool == false) {
    
        //Si está marcado...
        // if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == true) {
        //   firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
        //     asiste: firebase.firestore.FieldValue.arrayUnion(fechaEntrenamiento)
        //   });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
            falta: firebase.firestore.FieldValue.arrayRemove(fechaEntrenamiento)
          });
          bool = true
        }
      // }

    
  }


}
