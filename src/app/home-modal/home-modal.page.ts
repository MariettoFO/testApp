import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import firebase from 'firebase/app';
import { Equipo } from '../interfaces';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home-modal',
  templateUrl: './home-modal.page.html',
  styleUrls: ['./home-modal.page.scss'],
})
export class HomeModalPage implements OnInit {

  constructor(private modalCtrl: ModalController,
              public firebaseService: FirebaseService) {}

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
    // uid: firebase.auth().currentUser.uid,
    nombre: (document.getElementById("inputequipo") as HTMLInputElement).value
  }
  this.firebaseService.crearEquipo<Equipo>(nuevoEquipo, path);
  this.firebaseService.cargarEquipos()

  this.modalCtrl.dismiss({
    // uid: firebase.auth().currentUser.uid,
    equipo: (document.getElementById("inputequipo") as HTMLInputElement).value
  });
}
}
