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

  selectSegment: string;
  jugadores: Array<Jugador>;
  porteros: Array<Jugador>;
  defensas: Array<Jugador>;
  mediocentros: Array<Jugador>;
  delanteros: Array<Jugador>;
  apellidos: Array<string>;
  apodo: Array<string>;
  dorsal: Array<string>;
  posicion: Array<string>;
  edad: Array<string>;
  idJugadores: Array<string>

  constructor(private dataService: DataService, private modalCtrl: ModalController, private homePage: HomePage) { 
    this.selectSegment = 'todos'
    this.jugadores = []
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
    this.cargarJugadores();
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

  cargarJugadores(){

    const db = firebase.firestore();

    const getIdJugadores = db.collection(this.dataService.getPathJugadores()).get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc =>
        this.idJugadores.push(doc.id))
      })

    const getJugadores = db.collection(this.dataService.getPathJugadores()).get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc =>
        this.jugadores.push({id: doc.id,
        nombre: doc.data().nombre, 
        apellidos: doc.data().apellidos, 
        apodo: doc.data().apodo, 
        dorsal: doc.data().dorsal, 
        posicion: doc.data().posicion,
        edad: doc.data().edad}))
      })

  }

  getJugadores(){
    var db = firebase.firestore().collection(this.dataService.getPathJugadores()).onSnapshot((querySnapshot) => {
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
      this.jugadores = jugact

      this.getPosicion()
    })

    console.log('actualizados jugadores = '+ this.jugadores);
    return this.jugadores
  }

  getPosicion(){

    for(var i = 0; this.jugadores.length > i; i++){
      if(this.jugadores[i].posicion.toLowerCase() == 'por'){
        for(var x = 0; this.porteros.length > x || x == 0; x++){
          if(x > 0 && this.porteros[x] == undefined){
            break
          }
          if(this.porteros[x] == undefined || this.porteros[x].id != this.jugadores[i].id){
            this.porteros.push(this.jugadores[i])
          }
        }
      }

      if(this.jugadores[i].posicion.toLowerCase() == 'def'){
        for(var x = 0; this.defensas.length > x || x == 0; x++){
          if(x > 0 && this.defensas[x] == undefined){
            break
          }
          if(this.defensas[x] == undefined || this.defensas[x].id != this.jugadores[i].id){
            this.defensas.push(this.jugadores[i])
          }
        }
      }

      if(this.jugadores[i].posicion.toLowerCase() == 'med'){
        for(var x = 0; this.mediocentros.length > x || x == 0; x++){
          if(x > 0 && this.mediocentros[x] == undefined){
            break
          }
          if(this.mediocentros[x] == undefined || this.mediocentros[x].id != this.jugadores[i].id){
            this.mediocentros.push({id: this.jugadores[i].id,
              nombre: this.jugadores[i].nombre, 
              apellidos: this.jugadores[i].apellidos, 
              apodo: this.jugadores[i].apodo, 
              dorsal: this.jugadores[i].dorsal, 
              posicion: this.jugadores[i].posicion,
              edad: this.jugadores[i].edad})
          }
        }
      }

      if(this.jugadores[i].posicion.toLowerCase() == 'del'){
        for(var x = 0; this.delanteros.length > x || x == 0; x++){
          if(x > 0 && this.delanteros[x] == undefined){
            break
          }
          if(this.delanteros[x] == undefined || this.delanteros[x].id != this.jugadores[i].id){
            this.delanteros.push({id: this.jugadores[i].id,
              nombre: this.jugadores[i].nombre, 
              apellidos: this.jugadores[i].apellidos, 
              apodo: this.jugadores[i].apodo, 
              dorsal: this.jugadores[i].dorsal, 
              posicion: this.jugadores[i].posicion,
              edad: this.jugadores[i].edad})
          }
        }
      }

    }

    console.log('POR =>' + this.porteros + ' DEF => ' +  this.defensas + ' MED => ' + this.mediocentros + ' DEL => ' +  this.delanteros)
   }

   doRefresh(event){
    setTimeout(() => {
      this.getJugadores()
      event.target.complete();
    }, 1500);
  }

}
