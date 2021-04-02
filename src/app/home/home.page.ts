import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { ModalController } from '@ionic/angular';
import { HomeModalPage } from '../home-modal/home-modal.page';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private modalCtrl: ModalController, public cloud: FirebaseApp) { }

  ngOnInit() {
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


}