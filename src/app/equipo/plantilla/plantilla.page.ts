import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { PlantillaModalPage } from '../plantilla-modal/plantilla-modal.page';
import firebase from 'firebase/app';
import { HomePage } from 'src/app/home/home.page';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Jugador, JugadorId } from 'src/app/interfaces';


@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.page.html',
  styleUrls: ['./plantilla.page.scss'],
})
export class PlantillaPage implements OnInit {

  selectSegment: string;
  jugadores: Array<Jugador>;
  jugadoresId: Array<JugadorId>;
  porteros: Array<JugadorId>;
  defensas: Array<JugadorId>;
  mediocentros: Array<JugadorId>;
  delanteros: Array<JugadorId>;
  apellidos: Array<string>;
  apodo: Array<string>;
  dorsal: Array<string>;
  posicion: Array<string>;
  edad: Array<string>;
  idJugadores: Array<string>

  constructor(private dataService: DataService, private modalCtrl: ModalController, private homePage: HomePage) { 
    this.selectSegment = 'todos'
    this.jugadores = []
    this.jugadoresId = []
    this.porteros = []
    this.defensas = []
    this.mediocentros = []
    this.delanteros = []
    this.idJugadores = []
    this.apellidos = []
    this.apodo = []
    this.dorsal = []
    this.posicion = []
    this.edad = []
   }

   

  ngOnInit() {
    // this.cargarJugadores();
    this.getJugadores();
  }

  segmentChanged(event){
    this.selectSegment = event.detail.value.toLowerCase();
  }

  async abrirModalPlantilla(){
    const modal = await this.modalCtrl.create({
      component: PlantillaModalPage,
      componentProps:{
        equipo: 'CD San Roque EFF',
        icono: '../../assets/icon/favicon.png'
      }
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();

    console.log('retorno del modal', data);
  }

  // cargarJugadores(){

  //   const db = firebase.firestore();

  //   const getIdJugadores = db.collection(this.dataService.getPathJugadores()).get().then((querySnapshot) => {
  //     querySnapshot.docs.forEach(doc =>
  //       this.idJugadores.push(doc.id))
  //     })

  //   const getJugadores = db.collection(this.dataService.getPathJugadores()).get().then((querySnapshot) => {
  //     querySnapshot.docs.forEach(doc =>
  //       this.jugadores.push({
  //       nombre: doc.data().nombre, 
  //       apellidos: doc.data().apellidos, 
  //       apodo: doc.data().apodo, 
  //       dorsal: doc.data().dorsal, 
  //       posicion: doc.data().posicion,
  //       edad: doc.data().edad}))
  //     })

  // }

  getJugadores(){
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

    firebase.firestore().collection(this.dataService.getPathJugadores()).where("posicion", "==", "aPOR").orderBy("dorsal").onSnapshot((querySnapshot) => {
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

      this.porteros = jugact

    })

    firebase.firestore().collection(this.dataService.getPathJugadores()).where("posicion", "==", "bDEF").orderBy("dorsal").onSnapshot((querySnapshot) => {
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

      this.defensas = jugact

    })

    firebase.firestore().collection(this.dataService.getPathJugadores()).where("posicion", "==", "cMED").orderBy("dorsal").onSnapshot((querySnapshot) => {
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

      this.mediocentros = jugact

    })

    firebase.firestore().collection(this.dataService.getPathJugadores()).where("posicion", "==", "dDEL").orderBy("dorsal").onSnapshot((querySnapshot) => {
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

      this.delanteros = jugact

    })

    console.log('actualizados jugadores = '+ this.jugadoresId);
    return this.jugadoresId
  }

  getPositionColor(posicion){
    
    switch(posicion.toLowerCase()){
      case 'por':
        return 'orange'

      case 'def':
        return 'blue'

      case 'med':
        return 'green'

      case 'del':
        return 'red'

    }

  }


   doRefresh(event){
    setTimeout(() => {
      this.getJugadores()
      event.target.complete();
    }, 1500);
  }

}
