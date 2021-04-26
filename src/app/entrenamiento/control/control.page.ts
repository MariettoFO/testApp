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
  idEntrenamiento: string;
  entFinalizado: string;


  constructor(private dataService: DataService) {
    this.numEntrenamiento = this.dataService.numEntrenamiento
    this.jugadoresId = []
    this.idEntrenamiento = this.dataService.idEntrenamiento
    this.entFinalizado = this.dataService.finEntrenamiento
  }

  listaJugadores(){

//Cambiar icono
    if((document.getElementById('iconAsistencia') as HTMLIonIconElement).name == 'chevron-forward-outline'){
      (document.getElementById('iconAsistencia') as HTMLIonIconElement).name = 'chevron-down-outline'
    } else {
      (document.getElementById('iconAsistencia') as HTMLIonIconElement).name = 'chevron-forward-outline'
    }

//Mostrar lista de jugadores
    if(document.getElementById('listaAsistencia').style.visibility == 'hidden'){
      document.getElementById('listaAsistencia').style.visibility = 'visible'
    } else {
      document.getElementById('listaAsistencia').style.visibility = 'hidden'
    }

  }

  cambiarIcono(){
    if((document.getElementById('iconAsistencia') as HTMLIonIconElement).name == 'chevron-forward-outline'){
      (document.getElementById('iconAsistencia') as HTMLIonIconElement).name = 'chevron-down-outline'
    } else {
      (document.getElementById('iconAsistencia') as HTMLIonIconElement).name = 'chevron-forward-outline'
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

  cambiarTickAsiste(id){

    (document.getElementById('falta' + id) as HTMLIonCheckboxElement).checked = false

  }

  cambiarTickFalta(id){

    (document.getElementById('asiste' + id) as HTMLIonCheckboxElement).checked = false

  }
  ngOnInit() {
    this.cargarJugadores()
  }

  guardarCambios(){
    //EntrenamientoFinalizado
    var entFinalizado = false
    var miBool = Boolean(this.entFinalizado)

    if((document.getElementById('entFinalizado') as HTMLIonToggleElement).checked == true && miBool == false){
      entFinalizado = true
      firebase.firestore().collection(this.dataService.getPathEntrenamientos()).doc(this.idEntrenamiento).update({finalizado: entFinalizado})
    } 
    if((document.getElementById('entFinalizado') as HTMLIonToggleElement).checked == false && miBool == true){
      firebase.firestore().collection(this.dataService.getPathEntrenamientos()).doc(this.idEntrenamiento).update({finalizado: entFinalizado})
    } 


    //Campo Asistencia

    // for(var i = 0; i < this.jugadoresId.length; i++){
    //   if((document.getElementById('asiste' + this.jugadoresId[i].id) as HTMLIonCheckboxElement).checked){
    //     this.dataService.pathJugadoresEstadistica = this.dataService.pathJugadores + this.jugadoresId[i].id
    //     firebase.firestore().collection(this.dataService.getPathJugadores()).doc(this.jugadoresId[i].id).update({asiste: entFinalizado})
    //   }
    //   if((document.getElementById('falta' + this.jugadoresId[i].id) as HTMLIonCheckboxElement).checked){
    //     firebase.firestore().collection(this.dataService.getPathJugadores()+this.jugadoresId[i].id+'/estadisticas').doc(idEstadistica).update({falta: entFinalizado})
    //   }
    // }

  }

}
