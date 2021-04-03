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

  equipos: Array<string>;

  // insertarEquipos(doc){
  //   // var nombre = document.getElementById('nombre')
  //   this.equipos = []

  //   this.equipos = doc.data()

  // }

  cargarEquipos(){
    this.equipos=[]
    let contador: number = 0
    const db = firebase.firestore();
    const getEquipos = db.collection('users/' + firebase.auth().currentUser.uid + '/equipos/').get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc =>
        // console.log(doc.data().nombre),)
        // this.insertarEquipos(doc))
        
        // document.getElementById('nombre').textContent = doc.data().nombre)
        this.equipos[(doc.data().nombre).length] = doc.data().nombre)
    })
    // const equiposCollection: AngularFirestoreCollection = this.Firestore.collection('users/' + firebase.auth().currentUser.uid + 'equipos/').doc().get()
  }
}