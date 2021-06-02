import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AlertController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
})
export class EquipoPage {

  constructor(public dataService: DataService, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async infoAlert(){
    await this.alertCtrl.create({
      header: "Ayuda",
      message: "En esta página podrás acceder a: Plantilla, Estadísticas, Calendario y Configuración.",
      buttons:[{
        text:'¡Entendido!',
        // handler:()=>{
        //   this.navCtr.navigateBack(['entrenamiento-modal'])
        // }
      }]
    }).then(alert => alert.present())
  }

  

}
