import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import firebase from 'firebase/app';
import { DataService } from 'src/app/data.service';
import { HomePage } from 'src/app/home/home.page';
import { Jugador } from 'src/app/interfaces';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { async } from '@angular/core/testing';
// import { PlantillaPage } from '../plantilla/plantilla.page';



@Component({
  selector: 'app-plantilla-modal',
  templateUrl: './plantilla-modal.page.html',
  styleUrls: ['./plantilla-modal.page.scss'],
})
export class PlantillaModalPage implements OnInit {

  constructor(private modalCtrl: ModalController,private alertCtrl: AlertController, public loadingCtrl: LoadingController, private navCtr: NavController, private dataService: DataService, private firebaseService: FirebaseService
    ) { 
      
    }

// @Input() equipoSelect
// @Input() equipo;
// @Input() icono;
ngOnInit() {
}

salirSinGuardar(){
  this.modalCtrl.dismiss();
}

salirGuardando(){
  console.log(this.dataService.getPathJugadores())
  const path = this.dataService.getPathJugadores()
  var pos = document.getElementById("posicion") as HTMLInputElement
  var finalPos = ""

  if(pos.value == 'POR'){
    finalPos = "aPOR"
  }
  if(pos.value == 'DEF'){
    finalPos = "bDEF"
  }
  if(pos.value == 'MED'){
    finalPos = "cMED"
  }
  if(pos.value == 'DEL'){
    finalPos = "dDEL"
  }

  const nuevoJugador: Jugador = {
    // id: firebase.auth().currentUser.uid,
    nombre: (document.getElementById("nombres") as HTMLInputElement).value,
    apellidos: (document.getElementById("apellidos") as HTMLInputElement).value,
    apodo: (document.getElementById("apodo") as HTMLInputElement).value,
    dorsal: (document.getElementById("dorsal") as HTMLInputElement).value,

    posicion: finalPos,

    edad: (document.getElementById("edad") as HTMLInputElement).value
  }
  try{
    this.firebaseService.crearEquipo<Jugador>(nuevoJugador, path)
    // this.plantillaPage.cargarJugadores();

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
  
}
