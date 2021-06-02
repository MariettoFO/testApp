import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../data.service';
import { PartidoId } from '../interfaces';
import firebase from 'firebase/app';
import { PartidoModalPage } from '../partido-modal/partido-modal.page';



@Component({
  selector: 'app-partido',
  templateUrl: './partido.page.html',
  styleUrls: ['./partido.page.scss'],
})
export class PartidoPage implements OnInit {
  selectSegment: string;
  partido: Array<PartidoId>;
  jugados: Array<PartidoId>;
  programados: Array<PartidoId>;
  partidoSelect: string;


  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController, public dataService: DataService, private deleteAlert: AlertController) { 
      this.selectSegment = 'todos'
      this.partido = []
      this.partidoSelect = ""
    }


    

  ngOnInit() {
    this.getPartidos()
  }

  getPartidos(){
    firebase.firestore().collection(this.dataService.getPathPartidos()).orderBy('jornada').onSnapshot((querySnapshot) => {
      var entact = [];
      querySnapshot.forEach((doc) =>{
        entact.push({id: doc.id,
          jornada: doc.data().jornada, 
          rival: doc.data().rival, 
          campo: doc.data().campo,
          fecha: doc.data().fecha,
          hora: doc.data().hora,
          resultado: doc.data().resultado,
          finalizado: doc.data().finalizado})
        });

      this.partido = entact
      this.dataService.partidos = entact
    })

    firebase.firestore().collection(this.dataService.getPathPartidos()).where('finalizado', '==', true).orderBy('jornada').onSnapshot((querySnapshot) => {
      var entact = [];
      querySnapshot.forEach((doc) =>{
        entact.push({id: doc.id,
          jornada: doc.data().jornada, 
          rival: doc.data().rival, 
          campo: doc.data().campo,
          fecha: doc.data().fecha,
          hora: doc.data().hora,
          resultado: doc.data().resultado,
          finalizado: doc.data().finalizado})      
        });

      this.jugados = entact
    })

    firebase.firestore().collection(this.dataService.getPathPartidos()).where('finalizado', '==', false).orderBy('jornada').onSnapshot((querySnapshot) => {
      var entact = [];
      querySnapshot.forEach((doc) =>{
        entact.push({id: doc.id,
          jornada: doc.data().jornada, 
          rival: doc.data().rival, 
          campo: doc.data().campo,
          fecha: doc.data().fecha,
          hora: doc.data().hora,
          resultado: doc.data().resultado,
          finalizado: doc.data().finalizado})
      });

      this.programados = entact
    })

    // this.dataService.convocatoria = []

    // for(var x = 0; x<this.jugadoresId.length; x++){
    //   firebase.firestore().collection(this.dataService.pathJugadores + this.jugadoresId[x].id + '/estadisticas').get().then((querySnapshot) => {
    //     var estact = [];
    //     querySnapshot.forEach((doc) =>{
    //       this.dataService.convocatoria.push({id: doc.id, convocado: doc.data().convocado, desconvocado: doc.data().desconvocado, titular: doc.data().titular})

    //     })

    //     console.log(this.dataService.convocatoria)

    //   })

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

        this.dataService.convocatoria = []

    for(var x = 0; x<this.dataService.jugadoresId.length; x++){
      firebase.firestore().collection(this.dataService.pathJugadores + this.dataService.jugadoresId[x].id + '/estadisticas').get().then((querySnapshot) => {
        var estact = [];
        querySnapshot.forEach((doc) =>{
          this.dataService.convocatoria.push({id: doc.id, convocado: doc.data().convocado, desconvocado: doc.data().desconvocado, titular: doc.data().titular})

        })

        console.log(this.dataService.convocatoria)

      })
  
    }
  })


    return this.partido
  }

  getPartidoSelect(partido, id, finalizado, fecha, campo, rival, resultado){
    this.dataService.numPartido = partido
    this.dataService.idPartido = id
    this.dataService.parFinalizado = finalizado
    this.dataService.fechaPartido = fecha
    this.dataService.campoPartido = campo
    this.dataService.rivalPartido = rival
    this.dataService.resultadoPartido = resultado

    return this.dataService.numPartido, this.dataService.idPartido, this.dataService.parFinalizado, this.dataService.fechaPartido, this.dataService.campoPartido, this.dataService.rivalPartido, this.dataService.resultadoPartido
  }

  async infoAlert(){
    await this.alertCtrl.create({
      header: "Ayuda",
      message: "En esta página podrás crear partidos y acceder a gestionar los eventos del mismo.",
      buttons:[{
        text:'¡Entendido!',
        // handler:()=>{
        //   this.navCtr.navigateBack(['entrenamiento-modal'])
        // }
      }]
    }).then(alert => alert.present())
  }

  async abrirModalPartido(){
    const modal = await this.modalCtrl.create({
      component: PartidoModalPage,
      componentProps:{
        equipo: 'CD San Roque EFF',
        icono: '../../assets/icon/favicon.png'
      }
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();

    console.log('retorno del modal', data);
  }

  segmentChanged(event){
    this.selectSegment = event.detail.value.toLowerCase();
  }

  doRefresh(event){
    setTimeout(() => {
      // this.getJugadores()
      event.target.complete();
    }, 1500);
  }

  async borrarPartido(idPartido){
    var id = ""
    var i = 0
    this.getPartidos()

    for(i = 0; this.dataService.partidos.length > i; i++){
      if(this.dataService.partidos[i].id == idPartido) {
        id = this.dataService.partidos[i].id
        break
      }
    }
    const alerta = await this.deleteAlert.create({
      header: 'Alerta',
      subHeader: 'Ten cuidado',
      message: 'Va a borrar la jornada nº' + this.dataService.partidos[i].jornada + ' , perderá todos los datos de este partido. ¿Desea continuar?',
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
              this.borrarPartidoJugador(this.dataService.jugadoresId[x].id, this.dataService.partidos[i].fecha)
            }
            firebase.firestore().collection(this.dataService.getPathPartidos()).doc(id).delete()
            console.log('Confirm Okay');
          }
        }] 
    })

    await alerta.present()
  }

  borrarPartidoJugador(jugadorId, fechaPartido){
    // for(var i = 0; this.dataService.jugadoresId.length > i; i++){
    //   var path = this.dataService.pathJugadores + this.dataService.jugadoresId[i].id + '/estadisticas' + idPartido
    //   firebase.firestore().collection(this.dataService.pathJugadores + this.dataService.jugadoresId[i].id + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
    //     falta: firebase.firestore.FieldValue.arrayRemove(fechaEntrenamiento)
    //   });
    // }

    // var docId = ""
    var num = 0
    // var asistencia = []
    // var falta = []
    var checkedConv = ""
    var checkedTit = ""

    //Para saber posicion del array de asistencia
    for(var i = 0; i<this.dataService.jugadoresId.length; i++){
      if(this.dataService.jugadoresId[i].id == jugadorId){
        num = i
      }
    }
      //Comprobar si existe la fecha en asiste
      for(var i = 0; i<this.dataService.convocatoria[num].convocado.length; i++){
        if(this.dataService.convocatoria[num].convocado[i] == fechaPartido){
          checkedConv = "convocado"
        }
      }

      //Comprobar si existe la fecha en falta
      for(var i = 0; i<this.dataService.convocatoria[num].desconvocado.length; i++){
        if(this.dataService.convocatoria[num].desconvocado[i] == fechaPartido){
          checkedConv = "desconvocado"
        }
      }

      //Comprobar si existe la fecha en titular
      for(var i = 0; i<this.dataService.convocatoria[num].titular.length; i++){
        if(this.dataService.convocatoria[num].titular[i] == fechaPartido){
          checkedTit = "titular"
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
      if (checkedConv == 'convocado') {

        //Si no está marcado...
        // if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == false) {
          // firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
          //   falta: firebase.firestore.FieldValue.arrayUnion(fechaEntrenamiento)
          // });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.convocatoria[num].id).update({
            convocado: firebase.firestore.FieldValue.arrayRemove(fechaPartido)
          });
        // }
      }

      //Si se ha registrado esta fecha en falta se elimina de falta y se añade en asistencia
      if (checkedConv == 'desconvocado') {
    
        //Si está marcado...
        // if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == true) {
        //   firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
        //     asiste: firebase.firestore.FieldValue.arrayUnion(fechaEntrenamiento)
        //   });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.convocatoria[num].id).update({
            desconvocado: firebase.firestore.FieldValue.arrayRemove(fechaPartido)
          });
        }

        if (checkedTit == 'titular') {
    
          //Si está marcado...
          // if ((document.getElementById('asiste' + jugadorId) as HTMLIonCheckboxElement).checked == true) {
          //   firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.asistencia[num].id).update({
          //     asiste: firebase.firestore.FieldValue.arrayUnion(fechaEntrenamiento)
          //   });
            firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.convocatoria[num].id).update({
              titular: firebase.firestore.FieldValue.arrayRemove(fechaPartido)
            });
          }
      // }

    
  }

}
