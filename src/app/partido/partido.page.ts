import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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


  constructor(private modalCtrl: ModalController, public dataService: DataService) { 
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
          finalizado: doc.data().finalizado})
      });

      this.programados = entact
    })

    // firebase.firestore().collection(this.dataService.getPathJugadores()).orderBy("posicion").onSnapshot((querySnapshot) => {
    //   var jugact = [];
    //   querySnapshot.forEach((doc) =>{
    //     jugact.push({id: doc.id,
    //       nombre: doc.data().nombre, 
    //       apellidos: doc.data().apellidos, 
    //       apodo: doc.data().apodo, 
    //       dorsal: doc.data().dorsal, 
    //       posicion: doc.data().posicion,
    //       edad: doc.data().edad})
    //   });

    //   for(var i = 0; jugact.length > i; i++){
    //     if(jugact[i].posicion == 'aPOR'){
    //       jugact[i].posicion = "POR"
    //     }
    //     if(jugact[i].posicion == 'bDEF'){
    //       jugact[i].posicion = "DEF"
    //     }
    //     if(jugact[i].posicion == 'cMED'){
    //       jugact[i].posicion = "MED"
    //     }
    //     if(jugact[i].posicion == 'dDEL'){
    //       jugact[i].posicion = "DEL"
    //     }
    //   }

    //   this.dataService.jugadoresId = jugact

    //   this.dataService.asistencia = []

    //   for(var x = 0; x<this.dataService.jugadoresId.length; x++){
    //     firebase.firestore().collection(this.dataService.pathJugadores + this.dataService.jugadoresId[x].id + '/estadisticas').get().then((querySnapshot) => {
    //       var estact = [];
    //       querySnapshot.forEach((doc) =>{
    //         this.dataService.asistencia.push({id: doc.id, asiste: doc.data().asiste, falta: doc.data().falta})
  
    //       })
  
    //       console.log(this.dataService.asistencia)
  
    //     })
    //   }

    // })

    return this.partido
  }

  getPartidoSelect(partido, id, finalizado, fecha, campo, rival){
    this.dataService.numPartido = partido
    this.dataService.idPartido = id
    this.dataService.parFinalizado = finalizado
    this.dataService.fechaPartido = fecha
    this.dataService.campoPartido = campo
    this.dataService.rivalPartido = rival

    return this.dataService.numPartido, this.dataService.idPartido, this.dataService.parFinalizado, this.dataService.fechaPartido, this.dataService.campoPartido, this.dataService.rivalPartido
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

}
