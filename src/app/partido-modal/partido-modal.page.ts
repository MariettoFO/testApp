import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-partido-modal',
  templateUrl: './partido-modal.page.html',
  styleUrls: ['./partido-modal.page.scss'],
})
export class PartidoModalPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  @Input() equipo;
  @Input() icono;
  ngOnInit() {
  }

  salirSinGuardar(){
    this.modalCtrl.dismiss();
  }

  salirGuardando(){
    this.modalCtrl.dismiss({
      equipo: 'CD San Roque',
      icono: 'hola'
    });

  }

}
