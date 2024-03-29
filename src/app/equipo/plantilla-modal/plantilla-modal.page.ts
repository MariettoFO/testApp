import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import firebase from 'firebase/app';
import { DataService } from 'src/app/data.service';
import { HomePage } from 'src/app/home/home.page';
import { Jugador, JugadorEstadistica } from 'src/app/interfaces';
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

  id: string;

  constructor(private modalCtrl: ModalController,private alertCtrl: AlertController, public loadingCtrl: LoadingController, private navCtr: NavController, private dataService: DataService, private firebaseService: FirebaseService
    ) { 
      this.id = ""
    }

ngOnInit() {
}

salirSinGuardar(){
  this.modalCtrl.dismiss();
}

calcularId(idAntiguo, idNuevo){

  idNuevo.sort()
  idAntiguo.sort()
  
  // for(var i = 0, b = false; i<idAntiguo.length; i++){
  //   for(var x = 0; x<idNuevo.length; x++){
  //     if(idAntiguo[i].id != idNuevo[x].id ){
  //       this.id = idNuevo[x].id
  //       b = true
  //       break
  //     }
  //   }
  //   if(b = true){
  //     break
  //   }
  // }
  for(var i = 0; i<idNuevo.length; i++){
    if(idAntiguo.length == 0){
      this.id = idNuevo[i].id
      break
    }

    if(idAntiguo.length == i){
      this.id = idNuevo[i].id
      break
    }

    if(idAntiguo.length <  i || idAntiguo[i].id != idNuevo[i].id ){
      this.id = idNuevo[i].id
      break
    } 

  }

  this.dataService.pathJugadoresEstadistica = this.dataService.pathJugadores + this.id + '/estadisticas'


  return this.id
}

async salirGuardando(){
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

  const nuevoJugadorEstadistica: JugadorEstadistica = {
    asiste: [],
    falta: [],
    convocado: [],
    desconvocado: [],
    titular: [],
    goles: 0,
    asistencias: 0,
    minutos: 0,
    amarillas: 0,
    rojas: 0
  }
  try{
    var idAntiguo = []
    var idNuevo = []
    if(nuevoJugador.nombre.length > 0 && nuevoJugador.apellidos.length > 0 && nuevoJugador.dorsal.length > 0 && nuevoJugador.posicion.length > 0 && nuevoJugador.edad.length > 0){

      await firebase.firestore().collection(this.dataService.getPathJugadores()).get().then((querySnapshot) => {
        var jugact = [];
        querySnapshot.forEach((doc) =>{
          jugact.push({id: doc.id, dorsal: doc.data().dorsal})
        });

        console.log(idAntiguo + 'first')

        idAntiguo = jugact
        console.log(idAntiguo + 'before')
      })
     

      console.log(idAntiguo + 'after')

      var bool = false
    
        for(var i = 0; idAntiguo.length > i; i++){
          if(idAntiguo[i].dorsal == nuevoJugador.dorsal) {
            bool = true
            break
          }
        }
    

      if(bool != true){
        await this.firebaseService.crearEquipo<Jugador>(nuevoJugador, path)

        await firebase.firestore().collection(this.dataService.getPathJugadores()).get().then((querySnapshot) => {
          idNuevo = [];
          querySnapshot.forEach((doc) =>{
            idNuevo.push({id: doc.id})
          });
        })

      await this.calcularId(idAntiguo, idNuevo)

      await this.firebaseService.crearEquipo<JugadorEstadistica>(nuevoJugadorEstadistica, this.dataService.pathJugadoresEstadistica)
      this.modalCtrl.dismiss();
    } else{
      this.alertCtrl.create({
        header: "Error al crear",
        message: "Por favor, compruebe que el dorsal introducido no haya sido asignado a otro jugador previamente.",
        buttons:[{
          text:'ok',
          // handler:()=>{
          //   this.navCtr.navigateBack(['entrenamiento-modal'])
          // }
        }]
      }).then(async alert => await alert.present())
    }
        

    } else {
      this.alertCtrl.create({
        header: "Error al crear",
        message: "Por favor, no deje campos vacíos.",
        buttons:[{
          text:'ok',
          // handler:()=>{
          //   this.navCtr.navigateBack(['entrenamiento-modal'])
          // }
        }]
      }).then(alert => alert.present())
    }
    
  } catch(err){
    // this.alertCtrl.create({
    //   header: "Error al crear",
    //   message: "Compruebe que los datos introducidos sean correctos.",
    //   buttons:[{
    //     text:'ok',
    //     handler:()=>{
    //       this.navCtr.navigateBack(['plantilla-modal'])
    //     }
    //   }]
    // })  
    console.log(err)
  }
}
  
}
