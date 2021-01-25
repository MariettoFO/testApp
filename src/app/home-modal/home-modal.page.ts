import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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


@Input() equipo;
@Input() icono;
ngOnInit() {
}

salirSinGuardar(){
  this.modalCtrl.dismiss();
}

salirGuardando(){

  // const path = 'equipos/'
  // const nuevoEquipo: Equipo = {
  //   nombre: 'Real Madrid C. F.'
  // }
  // this.firebaseService.crearEquipo<Equipo>

  // this.modalCtrl.dismiss({
  //   equipo: 'CD San Roque',
  //   icono: 'hola'
  // });
}
}
