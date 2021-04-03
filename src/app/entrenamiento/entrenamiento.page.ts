import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EntrenamientoModalPage } from '../entrenamiento-modal/entrenamiento-modal.page';

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.page.html',
  styleUrls: ['./entrenamiento.page.scss'],
})
export class EntrenamientoPage {

  items: any[] = []
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  doRefresh(event){
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

  async abrirModalEntrenamiento(){
    const modal = await this.modalCtrl.create({
      component: EntrenamientoModalPage,
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
