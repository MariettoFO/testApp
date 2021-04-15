import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PartidoModalPage } from '../partido-modal/partido-modal.page';



@Component({
  selector: 'app-partido',
  templateUrl: './partido.page.html',
  styleUrls: ['./partido.page.scss'],
})
export class PartidoPage implements OnInit {
  selectSegment: string;


  constructor(private modalCtrl: ModalController) { 
      this.selectSegment = 'todos'
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

  segmentChanged(event){
    this.selectSegment = event.detail.value.toLowerCase();
  }

  doRefresh(event){
    setTimeout(() => {
      // this.getJugadores()
      event.target.complete();
    }, 1500);
  }

}
