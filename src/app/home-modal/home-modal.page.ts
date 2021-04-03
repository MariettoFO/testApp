import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import firebase from 'firebase/app';
import { HomePage } from '../home/home.page';
import { Equipo } from '../interfaces';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home-modal',
  templateUrl: './home-modal.page.html',
  styleUrls: ['./home-modal.page.scss'],
})
export class HomeModalPage implements OnInit {

  constructor(private modalCtrl: ModalController,
              private firebaseService: FirebaseService, 
              private homePage: HomePage
              ) {}

// @Input() uid;
@Input() equipo;
@Input() icono;
ngOnInit() {
}

salirSinGuardar(){
  this.modalCtrl.dismiss();
}

salirGuardando(){

  const path = 'users/'+ firebase.auth().currentUser.uid +'/equipos/'
  const nuevoEquipo: Equipo = {
    nombre: (document.getElementById("inputequipo") as HTMLInputElement).value
  }
  this.firebaseService.crearEquipo<Equipo>(nuevoEquipo, path);
  this.homePage.cargarEquipos();

  this.modalCtrl.dismiss({
    // uid: firebase.auth().currentUser.uid,
    // nombre: (document.getElementById("inputequipo") as HTMLInputElement).value
  });
}
}
