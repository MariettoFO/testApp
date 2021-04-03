import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { PlantillaModalPage } from '../plantilla-modal/plantilla-modal.page';
import firebase from 'firebase/app';
import { HomePage } from 'src/app/home/home.page';


@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.page.html',
  styleUrls: ['./plantilla.page.scss'],
})
export class PlantillaPage implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  prueba: Observable<any>
  jugadores: Array<string>;

  constructor(private dataService: DataService, private modalCtrl: ModalController, private homePage: HomePage) { }

  ngOnInit() {
    this.prueba = this.dataService.getJugadores();
  }

  segmentChanged(event){
    const valorSegmento = event.detail.value;
  }

  async abrirModalPlantilla(){
    const modal = await this.modalCtrl.create({
      component: PlantillaModalPage,
      componentProps:{
        equipo: 'CD San Roque EFF',
        icono: '../../assets/icon/favicon.png'
      }
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();

    console.log('retorno del modal', data);
  }

  cargarJugadores(){
    this.jugadores=[]
    const db = firebase.firestore();
    const getJugadores = db.collection('users/' + firebase.auth().currentUser.uid + '/equipos/' + this.homePage.equipoSeleccionado()).get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc =>
        // console.log(doc.data().nombre),)
        // this.insertarEquipos(doc))
        
        // document.getElementById('nombre').textContent = doc.data().nombre)

        // this.equipos[(doc.data().nombre).length] = doc.data().nombre)

        this.jugadores.push(doc.data().nombre))
    })
    // const equiposCollection: AngularFirestoreCollection = this.Firestore.collection('users/' + firebase.auth().currentUser.uid + 'equipos/').doc().get()
  }
}
