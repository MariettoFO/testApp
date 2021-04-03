import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import firebase from 'firebase/app';
import { HomePage } from 'src/app/home/home.page';
import { Jugador } from 'src/app/interfaces';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-plantilla-modal',
  templateUrl: './plantilla-modal.page.html',
  styleUrls: ['./plantilla-modal.page.scss'],
})
export class PlantillaModalPage implements OnInit {

  constructor(private modalCtrl: ModalController, private homePage: HomePage, private firebaseService: FirebaseService
    ) { 
      
    }


@Input() equipo;
@Input() icono;
ngOnInit() {
}

// imagen(){
  
//   this.imagePicker.getPictures(options).then((results) => {
//     for (var i = 0; i < results.length; i++) {
//         console.log('Image URI: ' + results[i]);
//     }
//   }, (err) => { });
// }

salirSinGuardar(){
  this.modalCtrl.dismiss();
}

salirGuardando(){

  const path = 'users/'+ firebase.auth().currentUser.uid +'/equipos/' + firebase.firestore().collection().get(). + this.homePage.equipoSeleccionado()
  const nuevoJugador: Jugador = {
    // uid: firebase.auth().currentUser.uid,
    nombre: (document.getElementById("nombre") as HTMLInputElement).value,
    apellidos: (document.getElementById("apellidos") as HTMLInputElement).value,
    apodo: (document.getElementById("apodo") as HTMLInputElement).value,
    numero: (document.getElementById("numero") as HTMLInputElement).value,
    posicion: (document.getElementById("posicion") as HTMLInputElement).value,
    edad: (document.getElementById("edad") as HTMLInputElement).value
  }
  this.firebaseService.crearEquipo<Jugador>(nuevoJugador, path);

  this.modalCtrl.dismiss({
    // uid: firebase.auth().currentUser.uid,
    nombre: (document.getElementById("inputequipo") as HTMLInputElement).value
  });
}
}