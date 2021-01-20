import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { PlantillaModalPage } from '../plantilla-modal/plantilla-modal.page';


@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.page.html',
  styleUrls: ['./plantilla.page.scss'],
})
export class PlantillaPage implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;
  jugadores: Observable<any>;

  constructor(private dataService: DataService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.jugadores = this.dataService.getJugadores();
  }

  segmentChanged(event){
    const valorSegmento = event.detail.value;
  }

  async abrirModalPlantilla(){
    const modal = await this.modalCtrl.create({
      component: PlantillaModalPage,
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
