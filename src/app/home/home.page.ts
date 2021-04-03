import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { ModalController } from '@ionic/angular';
import { HomeModalPage } from '../home-modal/home-modal.page';
import { FirebaseService} from '../services/firebase.service'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { MaxLengthValidator } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private modalCtrl: ModalController, 
    // public firebaseService: FirebaseService
    ) { }

    equipoSelect = ""
    equipos: Array<string>;
    idEquipos: Array<string>;


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

  cargarEquipos(){
    this.equipos = []
    this.idEquipos = []
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

  equipoSeleccionado(){
    this.equipoSelect = (document.getElementById("nombre") as HTMLLabelElement).textContent;
    console.log(this.equipoSelect + " es el equipo seleccionado")

    return this.equipoSelect
  }

  getIdEquipo(){
    var idEquipo = ""
    for(var i = 0; i < this.equipos.length; i++){
      if(this.equipoSeleccionado() == this.equipos[i]){
        //PENDIENTE para sacar el id exit del for
        idEquipo=this.idEquipos[i]
      }
    }

    return idEquipo
  }

  doRefresh(event){
    setTimeout(() => {
      this.cargarEquipos()
      event.target.complete();
    }, 1500);
  }

}