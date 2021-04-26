import { Component, Injectable, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AlertController, ModalController } from '@ionic/angular';
import { HomeModalPage } from '../home-modal/home-modal.page';
import { FirebaseService} from '../services/firebase.service'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { MaxLengthValidator } from '@angular/forms';
import { SelectorMatcher } from '@angular/compiler';
import { DataService } from '../data.service';
import { Equipo } from '../interfaces';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

@Injectable({providedIn: 'root'})

export class HomePage implements OnInit{

  equipoSelect: string
  idSelect: string
  equipos: Array<Equipo>;
  jugadores: Array<string>;
  idEquipos: Array<string>;
  pathJugadores: string;
  pathEntrenamientos: string;
  pathPartidos: string;

  constructor( private modalCtrl: ModalController, public editAlert: AlertController,public deleteAlert: AlertController, private dataService: DataService) { 
      this.equipoSelect = ""
      this.pathJugadores = ""
      this.pathEntrenamientos = ""
      this.pathPartidos = ""
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
      component: HomeModalPage
      // ,
      // componentProps:{
      //   equipo: 'CD San Roque EFF',
      //   icono: '../../assets/icon/favicon.png'
      // }
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();
    console.log('retorno del modal', data);
  }

  getEquipos(){
    var db = firebase.firestore().collection('users/' + firebase.auth().currentUser.uid + '/equipos/').onSnapshot((querySnapshot) => {
      var equiposact = [];
      querySnapshot.forEach((doc) =>{
        equiposact.push({id: doc.id, nombre: doc.data().nombre})
      });
      console.log(equiposact);
      this.equipos = equiposact
    })

    console.log('actualizados equipos = '+ this.equipos);
    return this.equipos
  }


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

    const getEquipos = db.collection('users/' + firebase.auth().currentUser.uid + '/equipos/').orderBy("nombre").get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc =>
        this.equipos.push({id: doc.id, nombre: doc.data().nombre}))
      })

    // const getIdEquipos = db.collection('users/' + firebase.auth().currentUser.uid + '/equipos/').orderBy("nombre").get().then((querySnapshot) => {
    //   querySnapshot.docs.forEach(doc =>
    //     this.idEquipos.push(doc.id))
    //   })
  }

  async getJugadores(equipo){

    var idTeam = ""
    var db = firebase.firestore()

    this.equipoSelect = equipo
    console.log(this.equipoSelect + " es el equipo seleccionado")

    await this.getEquipos()
    await this.getIdEquipos()
    // await firebase.firestore().collection('users/' + firebase.auth().currentUser.uid + '/equipos/').onSnapshot((querySnapshot) => {
    //   var idact = [];
    //   querySnapshot.forEach((doc) =>{
    //     idact.push(doc.id)
    //   });
    //   console.log(idact);
    //   this.idEquipos = idact
    // })
    
    for(var i = 0, x = false; (i < this.equipos.length) && (x == false); i++) {
      if(this.equipos[i].nombre == equipo){
        idTeam = this.equipos[i].id
        this.idSelect = idTeam
        console.log(idTeam+ ' = ' + this.idSelect)
        x = true
      }
    }

    this.pathJugadores = 'users/' + firebase.auth().currentUser.uid + '/equipos/' + this.idSelect + '/jugadores/'
    this.dataService.pathJugadores = this.pathJugadores

    this.pathEntrenamientos = 'users/' + firebase.auth().currentUser.uid + '/equipos/' + this.idSelect + '/entrenamientos/'
    this.dataService.pathEntrenamientos = this.pathEntrenamientos
    
    this.pathPartidos = 'users/' + firebase.auth().currentUser.uid + '/equipos/' + this.idSelect + '/partidos/'
    this.dataService.pathPartidos = this.pathPartidos

    return this.pathJugadores
  }

  async editarEquipo(equipo){
    var id = ""

    this.getEquipos()
    this.getIdEquipos()

    for(var i = 0; this.equipos.length > i; i++){
      if(this.equipos[i].nombre == equipo) {
        id = this.equipos[i].id
        break
      }
    }
    const alerta = await this.editAlert.create({
      header: 'Alerta',
      subHeader: 'Introduce el nuevo nombre para ' + equipo,
      inputs: [{
        name: 'txtNombre',
        type: 'text',
        placeholder: 'Nuevo nombre'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'borrar',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Cambiar',
          handler: (data) => {
            firebase.firestore().collection('users/' + firebase.auth().currentUser.uid + '/equipos/').doc(id).update({nombre: data.txtNombre})
            console.log('Confirm Okay');
          }
        }] 
    })

    await alerta.present()
  }

  async borrarEquipo(equipo){
    var id = ""

    this.getEquipos()
    this.getIdEquipos()

    for(var i = 0; this.equipos.length > i; i++){
      if(this.equipos[i].nombre == equipo) {
        id = this.equipos[i].id
        break
      }
    }
    const alerta = await this.deleteAlert.create({
      header: 'Alerta',
      subHeader: 'Ten cuidado',
      message: 'Va a borrar ' + equipo + ', perderá todos sus datos de este equipo. ¿Desea continuar?',
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
            firebase.firestore().collection('users/' + firebase.auth().currentUser.uid + '/equipos/').doc(id).delete()
            console.log('Confirm Okay');
          }
        }] 
    })

    await alerta.present()
  }



  

  doRefresh(event){
    setTimeout(() => {
      this.getEquipos()
      event.target.complete();
    }, 1500);
  }


}