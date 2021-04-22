import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { JugadorId } from 'src/app/interfaces';
import { EntrenamientoPage } from '../entrenamiento.page';
import firebase from 'firebase/app';


@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage implements OnInit {

  numEntrenamiento: string;
  jugadoresId: Array<JugadorId>;


  constructor(private dataService: DataService) {
    this.numEntrenamiento = this.dataService.numEntrenamiento
    this.jugadoresId = []
  }

  listaJugadores(){

    if(document.getElementById('listaAsistencia').style.visibility == 'hidden'){
      document.getElementById('listaAsistencia').style.visibility = 'visible'
    } else {
      document.getElementById('listaAsistencia').style.visibility = 'hidden'
    }

  }

  cargarJugadores(){
    firebase.firestore().collection(this.dataService.getPathJugadores()).orderBy("posicion").onSnapshot((querySnapshot) => {
      var jugact = [];
      querySnapshot.forEach((doc) =>{
        jugact.push({id: doc.id,
          nombre: doc.data().nombre, 
          apellidos: doc.data().apellidos, 
          apodo: doc.data().apodo, 
          dorsal: doc.data().dorsal, 
          posicion: doc.data().posicion,
          edad: doc.data().edad})
      });

      for(var i = 0; jugact.length > i; i++){
        if(jugact[i].posicion == 'aPOR'){
          jugact[i].posicion = "POR"
        }
        if(jugact[i].posicion == 'bDEF'){
          jugact[i].posicion = "DEF"
        }
        if(jugact[i].posicion == 'cMED'){
          jugact[i].posicion = "MED"
        }
        if(jugact[i].posicion == 'dDEL'){
          jugact[i].posicion = "DEL"
        }
      }

      this.jugadoresId = jugact

    })
  }

  cambiarTickAsiste(){

    (document.getElementById('falta') as HTMLIonCheckboxElement).checked = false

  }

  cambiarTickFalta(){

    (document.getElementById('asiste') as HTMLIonCheckboxElement).checked = false

  }
  ngOnInit() {
    this.cargarJugadores()
  }

  

}
