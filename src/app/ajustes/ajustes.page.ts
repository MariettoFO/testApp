import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { DataService } from '../data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  modoOscuro: boolean

  constructor(private alertCtrl: AlertController, private authService: AuthService, private dataService: DataService, private menuCtrl: MenuController) { 
    this.modoOscuro = this.dataService.modoOscuro
  }

  ngOnInit() {
  }

  async infoAlert(){
    await this.alertCtrl.create({
      header: "Ayuda",
      message: "En esta página podrás modificar la configuración de la aplicación.",
      buttons:[{
        text:'¡Entendido!'
      }]
    }).then(alert => alert.present())
  }

  temaOscuro(){
    this.dataService.modoOscuro = !this.dataService.modoOscuro;
    document.body.classList.toggle('dark')
  }

  cerrarSesion(){
    this.authService.logoutFireauth()
    this.menuCtrl.enable(false, 'first')
  }
}

//PRUEBA