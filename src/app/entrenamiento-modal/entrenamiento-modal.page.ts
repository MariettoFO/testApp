import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { DataService } from '../data.service';
import { EntrenamientoPage } from '../entrenamiento/entrenamiento.page';
import { Entrenamiento } from '../interfaces';
import { FirebaseService } from '../services/firebase.service';
import firebase from 'firebase/app';


@Component({
  selector: 'app-entrenamiento-modal',
  templateUrl: './entrenamiento-modal.page.html',
  styleUrls: ['./entrenamiento-modal.page.scss'],
})
export class EntrenamientoModalPage implements OnInit {

  constructor(
    private entrenamientoPage: EntrenamientoPage, 
    private navCtr: NavController,private alertCtrl: AlertController,private modalCtrl: ModalController, private firebaseService: FirebaseService, private dataService: DataService) { 
      
    }

ngOnInit() {
}

salirSinGuardar(){
  this.modalCtrl.dismiss();
}

ordenarFecha(fecha){
  // var i = 0
  var cadenaFinal = ''
  var dia = ''
  var mes = ''
  var anio = ''

  // i = cadena.length

  // while (i>=0) {
  //   cadenaFinal += cadena.charAt(i)
  //   i--
  // }
  dia = fecha.toString().substring(8,10)
  mes = fecha.toString().substring(5,7)
  anio = fecha.toString().substring(0,4)

  cadenaFinal = dia + '/' + mes + '/' + anio


  return cadenaFinal
}

// calcularNumero(){
//   var numero = 0
//   var entrenamientoId = []

//   // entrenamientoId = this.entrenamientoPage.getEntrenamientos()

//   firebase.firestore().collection(this.dataService.getPathEntrenamientos()).orderBy('numero').onSnapshot((querySnapshot) => {
//     var entact = [];
//     querySnapshot.forEach((doc) =>{
//       entact.push({id: doc.id,
//         numero: doc.data().numero, 
//         fecha: doc.data().fecha, 
//         hora: doc.data().hora,
//         finalizado: doc.data().finalizado})
//     });

//     entrenamientoId = entact
//   })
//   // numero = (entrenamientoId).length + 1

//   for ( var i = 0; entrenamientoId.length > i; i++){
//     if(entrenamientoId[i].numero > 0){
//       numero = entrenamientoId[i]
//     }
//   }

//   if(entrenamientoId.length == 0){
//     numero = 1
//   } else {
//     numero++
//   }


//   return numero
// }

salirGuardando(){
  console.log(this.dataService.getPathEntrenamientos())
  const path = this.dataService.getPathEntrenamientos()

  const nuevoEntrenamiento: Entrenamiento = {
    numero: parseInt((document.getElementById("numero") as HTMLInputElement).value),
    fecha: this.ordenarFecha((document.getElementById("fecha") as HTMLIonDatetimeElement).value.toString().substring(0,10)),
    hora: (document.getElementById("hora") as HTMLIonDatetimeElement).value.toString().substring(11,16),
    finalizado: false
  }
  try{
    this.firebaseService.crearEquipo<Entrenamiento>(nuevoEntrenamiento, path)
      this.modalCtrl.dismiss({
      });

    
  } catch(err){
    this.alertCtrl.create({
      header: "Error al crear",
      message: "Compruebe que los datos introducidos sean correctos.",
      buttons:[{
        text:'ok',
        handler:()=>{
          this.navCtr.navigateBack(['entrenamiento-modal'])
        }
      }]
    })  }
}
}
