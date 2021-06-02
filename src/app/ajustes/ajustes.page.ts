import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  modoOscuro: boolean

  constructor(private alertCtrl: AlertController, private authService: AuthService, private menuCtrl: MenuController) { 
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.modoOscuro = prefersDark.matches
  }

  ngOnInit() {
  }

  async infoAlert(){
    await this.alertCtrl.create({
      header: "Ayuda",
      message: "En esta página podrás modificar la configuración de la aplicación.",
      buttons:[{
        text:'¡Entendido!',
        // handler:()=>{
        //   this.navCtr.navigateBack(['entrenamiento-modal'])
        // }
      }]
    }).then(alert => alert.present())
  }

  temaOscuro(){
    this.modoOscuro = !this.modoOscuro;
    document.body.classList.toggle('dark')
    // if(event.detail.checked){
    //   document.body.setAttribute('color-theme', 'dark')
    // } else {
    //   document.body.setAttribute('color-theme', 'light')
    // }
  }

  cerrarSesion(){
    this.authService.logoutFireauth()
    this.menuCtrl.enable(false, 'first')
  }
}
