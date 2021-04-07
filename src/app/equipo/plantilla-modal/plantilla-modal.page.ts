import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import firebase from 'firebase/app';
import { DataService } from 'src/app/data.service';
import { HomePage } from 'src/app/home/home.page';
import { Jugador } from 'src/app/interfaces';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { async } from '@angular/core/testing';



@Component({
  selector: 'app-plantilla-modal',
  templateUrl: './plantilla-modal.page.html',
  styleUrls: ['./plantilla-modal.page.scss'],
})
export class PlantillaModalPage implements OnInit {

  constructor(private modalCtrl: ModalController,private alertCtrl: AlertController, public loadingCtrl: LoadingController, private navCtr: NavController, private dataService: DataService, private firebaseService: FirebaseService
    ) { 
      
    }

@Input() equipoSelect
@Input() equipo;
@Input() icono;
ngOnInit() {
}

salirSinGuardar(){
  this.modalCtrl.dismiss();
}

salirGuardando(){
  console.log(this.dataService.getPathJugadores())
  const path = this.dataService.getPathJugadores()
  const nuevoJugador: Jugador = {
    // uid: firebase.auth().currentUser.uid,
    nombre: (document.getElementById("nombres") as HTMLInputElement).value,
    apellidos: (document.getElementById("apellidos") as HTMLInputElement).value,
    apodo: (document.getElementById("apodo") as HTMLInputElement).value,
    dorsal: (document.getElementById("dorsal") as HTMLInputElement).value,
    posicion: (document.getElementById("posicion") as HTMLInputElement).value,
    edad: (document.getElementById("edad") as HTMLInputElement).value
  }
  try{
    this.firebaseService.crearEquipo<Jugador>(nuevoJugador, path)

      this.modalCtrl.dismiss({
        // uid: firebase.auth().currentUser.uid,
        nombre: (document.getElementById("nombres") as HTMLInputElement).value
      });

    
  } catch(err){
    this.alertCtrl.create({
      header: "Error al crear",
      message: "Compruebe que los datos introducidos sean correctos.",
      buttons:[{
        text:'ok',
        handler:()=>{
          this.navCtr.navigateBack(['plantilla-modal'])
        }
      }]
    })  }
}
  // async errorUpdating (message: any) {
  //   const updating = await this.alertCtrl.create({
  //     header: "Error al crear",
  //     message: "Compruebe que los datos introducidos sean correctos.",
  //     buttons:[{
  //       text:'ok',
  //       handler:()=>{
  //         this.navCtr.navigateBack(['plantilla-modal'])
  //       }
  //     }]
  //   })
  //   await updating.present();
  // }

  
}
