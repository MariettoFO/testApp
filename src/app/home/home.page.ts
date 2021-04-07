import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { ModalController } from '@ionic/angular';
import { HomeModalPage } from '../home-modal/home-modal.page';
import { FirebaseService} from '../services/firebase.service'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { MaxLengthValidator } from '@angular/forms';
import { SelectorMatcher } from '@angular/compiler';
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  equipoSelect: string
  idSelect: string
  equipos: Array<string>;
  jugadores: Array<string>;
  idEquipos: Array<string>;
  pathJugadores: string;

  constructor( private modalCtrl: ModalController, private dataService: DataService) { 
      this.equipoSelect = ""
      this.pathJugadores = ""
      this.idSelect = ""
      this.equipos = []
      this.idEquipos = []
      this.jugadores = []
    }


  ngOnInit() {
    this.cargarEquipos()    
  }

  segmentChanged(event){
    const valorSegmento = event.detail.value;
  }

  async abrirModalEquipo(){
    const modal = await this.modalCtrl.create({
      component: HomeModalPage,
      componentProps:{
        equipo: 'CD San Roque EFF',
        icono: '../../assets/icon/favicon.png'
      }
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();
    console.log('retorno del modal', data);
  }

  getEquipos(){
    var db = firebase.firestore().collection('users/' + firebase.auth().currentUser.uid + '/equipos/').onSnapshot((querySnapshot) => {
      var equiposact = [];
      querySnapshot.forEach((doc) =>{
        equiposact.push(doc.data().nombre)
      });
      console.log(equiposact);
      this.equipos = equiposact
    })

    console.log('actualizados equipos = '+ this.equipos);
    return this.equipos
  }

  // getPath(){
  //   console.log(this.pathJugadores)
  //   return this.pathJugadores
  // }

  getIdEquipos(){
    var db = firebase.firestore().collection('users/' + firebase.auth().currentUser.uid + '/equipos/').onSnapshot((querySnapshot) => {
      var idact = [];
      querySnapshot.forEach((doc) =>{
        idact.push(doc.id)
      });
      console.log(idact);
      this.idEquipos = idact
    })

    console.log('actualizados id = '+ this.idEquipos);
    return this.idEquipos
  }


  cargarEquipos(){

    const db = firebase.firestore();

    const getEquipos = db.collection('users/' + firebase.auth().currentUser.uid + '/equipos/').get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc =>
        this.equipos.push(doc.data().nombre))
      })

    const getIdEquipos = db.collection('users/' + firebase.auth().currentUser.uid + '/equipos/').get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc =>
        this.idEquipos.push(doc.id))
      })
  }

  getJugadores(equipo){

    var idTeam = ""
    var db = firebase.firestore()

    this.equipoSelect = equipo
    console.log(this.equipoSelect + " es el equipo seleccionado")

    this.getEquipos()
    this.getIdEquipos()
    
    for(var i = 0, x = false; (i < this.equipos.length) && (x == false); i++) {
      if(this.equipos[i] == equipo){
        idTeam = this.idEquipos[i]
        this.idSelect = idTeam
        console.log(idTeam+ ' = ' + this.idSelect)
        x = true
      }
    }

    this.pathJugadores = 'users/' + firebase.auth().currentUser.uid + '/equipos/' + this.idSelect + '/jugadores/'
    // + this.idSelect + '/' 
    // + this.equipoSelect + '/jugadores/'
    this.dataService.pathJugadores = this.pathJugadores

    const getJugadores = db.collection(this.pathJugadores).get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc =>
        this.jugadores.push(doc.data().posicion, doc.data().nombre, doc.data().apellidos, doc.data().apodo, doc.data().edad, doc.data().numero))
      })

    // var db = firebase.firestore().collection('users/' + firebase.auth().currentUser.uid + '/equipos/' + this.idSelect + '/jugadores/').onSnapshot((querySnapshot) => {
    //   var jugact = [];
    //   querySnapshot.forEach((doc) =>{
    //     jugact.push(doc.id)
    //   });
    //   console.log(jugact);
    //   this.jugadores = jugact;
    // })

    console.log('actualizados final'+ this.jugadores);

    return this.jugadores, this.pathJugadores
  }

  

  doRefresh(event){
    setTimeout(() => {
      this.getEquipos()
      event.target.complete();
    }, 1500);
  }


}