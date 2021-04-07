import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { PlantillaModalPage } from '../plantilla-modal/plantilla-modal.page';
import firebase from 'firebase/app';
import { HomePage } from 'src/app/home/home.page';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Jugador } from 'src/app/interfaces';


@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.page.html',
  styleUrls: ['./plantilla.page.scss'],
})
export class PlantillaPage implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  jugadores: Array<Jugador>;
  apellidos: Array<string>;
  apodo: Array<string>;
  dorsal: Array<string>;
  posicion: Array<string>;
  edad: Array<string>;
  idJugadores: Array<string>

  constructor(private dataService: DataService, private modalCtrl: ModalController, private homePage: HomePage) { 
    this.jugadores = []
    this.idJugadores = []
    this.apellidos = []
    this.apodo = []
    this.dorsal = []
    this.posicion = []
    this.edad = []
   }

  ngOnInit() {
    this.cargarJugadores();
  }

  segmentChanged(event){
    const valorSegmento = event.detail.value;
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

  cargarJugadores(){

    const db = firebase.firestore();

    const getIdJugadores = db.collection(this.dataService.getPathJugadores()).get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc =>
        this.idJugadores.push(doc.id))
      })

    const getJugadores = db.collection(this.dataService.getPathJugadores()).get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc =>
        this.jugadores.push({nombre: doc.data().nombre, 
        apellidos: doc.data().apellidos, 
        apodo: doc.data().apodo, 
        dorsal: doc.data().dorsal, 
        posicion: doc.data().posicion,
        edad: doc.data().edad}))
      })

    // const getApellidos = db.collection(this.dataService.getPathJugadores()).get().then((querySnapshot) => {
    //   querySnapshot.docs.forEach(doc =>
    //     this.apellidos.push(doc.id))
    //   })
    
    // const getDorsal = db.collection(this.dataService.getPathJugadores()).get().then((querySnapshot) => {
    //   querySnapshot.docs.forEach(doc =>
    //     this.dorsal.push(doc.data().dorsal))
    //   })

    // const getPosicion = db.collection(this.dataService.getPathJugadores()).get().then((querySnapshot) => {
    //   querySnapshot.docs.forEach(doc =>
    //     this.posicion.push(doc.data().posicion))
    //   })

    // const getEdad = db.collection(this.dataService.getPathJugadores()).get().then((querySnapshot) => {
    //   querySnapshot.docs.forEach(doc =>
    //     this.edad.push(doc.data().edad))
    //   })

  }

  getJugadores(){
    var db = firebase.firestore().collection(this.dataService.getPathJugadores()).onSnapshot((querySnapshot) => {
      var jugact = [];
      querySnapshot.forEach((doc) =>{
        jugact.push(doc.data().nombre)
      });
      console.log(jugact);
      this.jugadores = jugact
    })

    console.log('actualizados equipos = '+ this.jugadores);
    return this.jugadores
  }

}
