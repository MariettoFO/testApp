import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import firebase from 'firebase/app';
import { DataService } from '../data.service';
import { EntrenamientoModalPage } from '../entrenamiento-modal/entrenamiento-modal.page';
import { EntrenamientoId } from '../interfaces';

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.page.html',
  styleUrls: ['./entrenamiento.page.scss']
})
export class EntrenamientoPage implements OnInit {

  selectSegment: string;
  entrenamientoSelect: string;
  entrenamientoId: Array<EntrenamientoId>
  finalizados: Array<EntrenamientoId>
  programados: Array<EntrenamientoId>

  constructor(private modalCtrl: ModalController, public deleteAlert: AlertController,private dataService: DataService) {
    this.selectSegment = 'todos'
    this.entrenamientoSelect = ''
    this.entrenamientoId = []
    this.finalizados = []
    this.programados = []

   }

  ngOnInit() {
    this.getEntrenamientos()
  }

  doRefresh(event){
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

  segmentChanged(event){
    this.selectSegment = event.detail.value.toLowerCase();
  }

  getFinalizadoColor(finalizado){
    
    switch(finalizado){
      case true:
        return 'green'

      case false:
        return 'orange'
    }

  }

  async abrirModalEntrenamiento(){
    // await console.log('hola')
    const modal = await this.modalCtrl.create({
      component: EntrenamientoModalPage,
      componentProps:{
        equipo: 'CD San Roque EFF',
        icono: '../../assets/icon/favicon.png'
      }
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();

    console.log('retorno del modal', data);
  }

  getEntrenamientoSelect(entrenamiento, id, finalizado, fecha){
    this.dataService.numEntrenamiento = entrenamiento
    this.dataService.idEntrenamiento = id
    this.dataService.finEntrenamiento = finalizado
    this.dataService.fechaEntrenamiento = fecha

    return this.dataService.numEntrenamiento, this.dataService.idEntrenamiento, this.dataService.finEntrenamiento, this.dataService.fechaEntrenamiento
  }

  getEntrenamientos(){
    firebase.firestore().collection(this.dataService.getPathEntrenamientos()).orderBy('numero').onSnapshot((querySnapshot) => {
      var entact = [];
      querySnapshot.forEach((doc) =>{
        entact.push({id: doc.id,
          numero: doc.data().numero, 
          fecha: doc.data().fecha, 
          hora: doc.data().hora,
          finalizado: doc.data().finalizado})
      });

      this.entrenamientoId = entact
      this.dataService.entrenamientos = entact
    })

    firebase.firestore().collection(this.dataService.getPathEntrenamientos()).where('finalizado', '==', true).orderBy('numero').onSnapshot((querySnapshot) => {
      var entact = [];
      querySnapshot.forEach((doc) =>{
        entact.push({id: doc.id,
          numero: doc.data().numero, 
          fecha: doc.data().fecha, 
          hora: doc.data().hora,
          finalizado: doc.data().finalizado})
      });

      this.finalizados = entact
    })

    firebase.firestore().collection(this.dataService.getPathEntrenamientos()).where('finalizado', '==', false).orderBy('numero').onSnapshot((querySnapshot) => {
      var entact = [];
      querySnapshot.forEach((doc) =>{
        entact.push({id: doc.id,
          numero: doc.data().numero, 
          fecha: doc.data().fecha, 
          hora: doc.data().hora,
          finalizado: doc.data().finalizado})
      });

      this.programados = entact
    })

    return this.entrenamientoId

  }

  async borrarEntrenamiento(idEntrenamiento){
    var id = ""
    var i = 0
    this.getEntrenamientos()

    for(i = 0; this.entrenamientoId.length > i; i++){
      if(this.entrenamientoId[i].id == idEntrenamiento) {
        id = this.entrenamientoId[i].id
        break
      }
    }
    const alerta = await this.deleteAlert.create({
      header: 'Alerta',
      subHeader: 'Ten cuidado',
      message: 'Va a borrar el entrenamiento nº' + this.entrenamientoId[i].numero + ' , perderá todos los datos de este entrenamiento. ¿Desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Borrar',
          cssClass: 'borrar',
          handler: () => {
            firebase.firestore().collection(this.dataService.getPathEntrenamientos()).doc(id).delete()
            console.log('Confirm Okay');
          }
        }] 
    })

    await alerta.present()
  }


}
