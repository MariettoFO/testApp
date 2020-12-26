import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PartidoModalPage } from '../partido-modal/partido-modal.page';



@Component({
  selector: 'app-partido',
  templateUrl: './partido.page.html',
  styleUrls: ['./partido.page.scss'],
})
export class PartidoPage implements OnInit {


  constructor(private modalCtrl: ModalController) { 
      
    }


    

  ngOnInit() {
  }

  async abrirModalPartido(){
    const modal = await this.modalCtrl.create({
      component: PartidoModalPage,
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
