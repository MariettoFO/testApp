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
  if(fecha != undefined && fecha != "" && fecha != null){
    dia = fecha.toString().substring(8,10)
    mes = fecha.toString().substring(5,7)
    anio = fecha.toString().substring(0,4)

    cadenaFinal = dia + '/' + mes + '/' + anio
  }

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
  try{
  console.log(this.dataService.getPathEntrenamientos())
  const path = this.dataService.getPathEntrenamientos()
  var boolNum = false
  var boolFecha = false 
  var boolFechaHoraMal = false
  var nuevoEntrenamiento: Entrenamiento
  var numero = 0
  var boolNumVacio = false

  if((document.getElementById("hora") as HTMLIonDatetimeElement).value != undefined
  && (document.getElementById("hora") as HTMLIonDatetimeElement).value != null && (document.getElementById("hora") as HTMLIonDatetimeElement).value != ""
  && (document.getElementById("fecha") as HTMLIonDatetimeElement).value != undefined && (document.getElementById("fecha") as HTMLIonDatetimeElement).value != null 
  && (document.getElementById("fecha") as HTMLIonDatetimeElement).value != ""){


    if(this.dataService.entrenamientos.length > 0 && ((document.getElementById("numero") as HTMLInputElement).value == "0" 
    || (document.getElementById("numero") as HTMLInputElement).value == undefined 
    || (document.getElementById("numero") as HTMLInputElement).value == null)){
      for(var i = 0; this.dataService.entrenamientos.length > i; i++){
        if(numero < this.dataService.entrenamientos[i].numero){
          numero = this.dataService.entrenamientos[i].numero
        }
      }
      numero++
    }else{
      boolNumVacio = true
    }

    nuevoEntrenamiento = {
      // numero: parseInt((document.getElementById("numero") as HTMLInputElement).value),
      numero: numero,
      fecha: this.ordenarFecha((document.getElementById("fecha") as HTMLIonDatetimeElement).value.toString().substring(0,10)),
      hora: (document.getElementById("hora") as HTMLIonDatetimeElement).value.toString().substring(11,16),
      finalizado: false
    }  
  } else {
    boolFechaHoraMal = true
  }


    for( var i = 0; i<this.dataService.entrenamientos.length; i++){
      if(nuevoEntrenamiento != undefined){
        if(nuevoEntrenamiento.numero == this.dataService.entrenamientos[i].numero){
          boolNum = true
        }
        if(nuevoEntrenamiento.fecha == this.dataService.entrenamientos[i].fecha){
          boolFecha = true
        }
      }
    }

    if(boolNum == false && boolFecha == false && boolFechaHoraMal == false && boolNumVacio == false){
      this.firebaseService.crearEquipo<Entrenamiento>(nuevoEntrenamiento, path)
      this.modalCtrl.dismiss({
      });
    } else {
      if(boolNum == true){
        this.alertCtrl.create({
          header: "Error al crear",
          message: "El número de entrenamiento introducido ya existe.",
          buttons:[{
            text:'ok',
            // handler:()=>{
            //   this.navCtr.navigateBack(['entrenamiento-modal'])
            // }
          }]
        }).then(alert => alert.present())
      }
      if(boolFecha == true){
        this.alertCtrl.create({
          header: "Error al crear",
          message: "Ya existe un entrenamiento programado en la fecha seleccionada.",
          buttons:[{
            text:'ok',
            // handler:()=>{
            //   this.navCtr.navigateBack(['entrenamiento-modal'])
            // }
          }]
        }).then(alert => alert.present())
      }
      if(boolFechaHoraMal == true){
        this.alertCtrl.create({
          header: "Error al crear",
          message: "Por favor, introduce la fecha y hora.",
          buttons:[{
            text:'ok',
            // handler:()=>{
            //   this.navCtr.navigateBack(['entrenamiento-modal'])
            // }
          }]
        }).then(alert => alert.present())
      }
      if(boolNumVacio == true){
        this.alertCtrl.create({
          header: "Error al crear",
          message: "Por favor, introduce un número de entrenamiento.",
          buttons:[{
            text:'ok',
            // handler:()=>{
            //   this.navCtr.navigateBack(['entrenamiento-modal'])
            // }
          }]
        }).then(alert => alert.present())
      }
     
    }

    
  } catch(err){
    console.log(err)
    this.alertCtrl.create({
      header: "Error al crear",
      message: "Compruebe que los datos introducidos sean correctos.",
      buttons:[{
        text:'ok',
        // handler:()=>{
        //   this.navCtr.navigateBack(['entrenamiento-modal'])
        // }
      }]
    })  }
}
}
