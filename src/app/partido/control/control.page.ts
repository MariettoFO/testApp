import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { JugadorId } from 'src/app/interfaces';
import firebase from 'firebase/app';


@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage implements OnInit {
  numPartido: string;
  jugadoresId: Array<JugadorId>;
  idPartido: string;
  parFinalizado: string;
  fechaPartido: string;
  checkConvocado: boolean;
  checkTitular: boolean;
  equipoSelect: string;
  equipoLocal: string;
  equipoVisitante: string;

  constructor(private dataService: DataService) { 
    this.numPartido = this.dataService.numPartido
    this.jugadoresId = []
    this.idPartido = this.dataService.idPartido
    this.parFinalizado = this.dataService.parFinalizado
    this.fechaPartido = this.dataService.fechaPartido
    this.checkConvocado = false
    this.checkTitular = false
    this.equipoSelect = this.dataService.equipoSelect
    this.equipoLocal = ""
    this.equipoVisitante = ""
  }

  getLocalVisitante(){
    if(this.dataService.campoPartido == 'local'){
      this.equipoLocal = this.equipoSelect
      this.equipoVisitante = this.dataService.rivalPartido
    }
    if(this.dataService.campoPartido == 'visitante'){
      this.equipoLocal = this.dataService.rivalPartido
      this.equipoVisitante = this.equipoSelect
    }
  }
  ngOnInit() {
    this.cargarJugadores()
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

      this.dataService.convocatoria = []

      for(var x = 0; x<this.jugadoresId.length; x++){
        firebase.firestore().collection(this.dataService.pathJugadores + this.jugadoresId[x].id + '/estadisticas').get().then((querySnapshot) => {
          var estact = [];
          querySnapshot.forEach((doc) =>{
            this.dataService.convocatoria.push({id: doc.id, convocado: doc.data().convocado, desconvocado: doc.data().desconvocado, titular: doc.data().titular})
  
          })
  
          console.log(this.dataService.convocatoria)
  
        })
      }

    })   

    this.getLocalVisitante()
  
}

  listaJugadores(){

    //Cambiar icono
    if((document.getElementById('iconConvocatoria') as HTMLIonIconElement).name == 'chevron-forward-outline'){
      (document.getElementById('iconConvocatoria') as HTMLIonIconElement).name = 'chevron-down-outline'
    } else {
      (document.getElementById('iconConvocatoria') as HTMLIonIconElement).name = 'chevron-forward-outline'
    }

    //Mostrar lista de jugadores
    if(document.getElementById('listaConvocatoria').style.visibility == 'hidden'){
      document.getElementById('listaConvocatoria').style.visibility = 'visible'
      document.getElementById('listaConvocatoria').style.display = ''
      if(document.getElementById('listaTitulares').style.visibility == 'visible'){
        document.getElementById('listaTitulares').style.visibility = 'hidden';
        document.getElementById('listaTitulares').style.display = 'none';
        (document.getElementById('iconTitulares') as HTMLIonIconElement).name = 'chevron-forward-outline'
      }
    } else {
      document.getElementById('listaConvocatoria').style.visibility = 'hidden'
      document.getElementById('listaConvocatoria').style.display = 'none'
    }

  }

  listaJugadoresTitulares(){

    //Cambiar icono
    if((document.getElementById('iconTitulares') as HTMLIonIconElement).name == 'chevron-forward-outline'){
      (document.getElementById('iconTitulares') as HTMLIonIconElement).name = 'chevron-down-outline'
    } else {
      (document.getElementById('iconTitulares') as HTMLIonIconElement).name = 'chevron-forward-outline'
    }

    //Mostrar lista de jugadores
    if(document.getElementById('listaTitulares').style.visibility == 'hidden'){
      document.getElementById('listaTitulares').style.visibility = 'visible'
      document.getElementById('listaTitulares').style.display = ''
      if(document.getElementById('listaConvocatoria').style.visibility == 'visible'){
        document.getElementById('listaConvocatoria').style.visibility = 'hidden';
        document.getElementById('listaConvocatoria').style.display = 'none';
        (document.getElementById('iconConvocatoria') as HTMLIonIconElement).name = 'chevron-forward-outline'
      }

    } else {
      document.getElementById('listaTitulares').style.visibility = 'hidden'
      document.getElementById('listaTitulares').style.display = 'none'
    }

  }

  checkearConvocatoria(){

    //Bucle para coger convocatoria de estadisticas y saber si checkear el checkbox
    if(this.checkConvocado == false){
      this.checkConvocado = true
      for(var x = 0; x<this.dataService.convocatoria.length; x++){
            for(var i = 0; i<this.dataService.convocatoria[x].convocado.length; i++){
              if(this.dataService.convocatoria[x].convocado[i] == this.fechaPartido){
                (document.getElementById('convocado' + this.jugadoresId[x].id) as HTMLIonCheckboxElement).checked = true
              }
            }

      }
    }
  }

  checkearTitulares(){

    for(var x = 0; x<this.jugadoresId.length; x++){
      if((document.getElementById('convocado' + this.jugadoresId[x].id) as HTMLIonCheckboxElement).checked == true){
        document.getElementById('itemTit' + this.jugadoresId[x].id).style.visibility = 'visible';
        document.getElementById('itemTit' + this.jugadoresId[x].id).style.display = '';
      }
      if((document.getElementById('convocado' + this.jugadoresId[x].id) as HTMLIonCheckboxElement).checked == false){
        document.getElementById('itemTit' + this.jugadoresId[x].id).style.visibility = 'hidden';
        document.getElementById('itemTit' + this.jugadoresId[x].id).style.display = 'none';
      }

    }

    if(this.checkTitular == false){
      this.checkTitular = true
      for(var x = 0; x<this.dataService.convocatoria.length; x++){
            for(var i = 0; i<this.dataService.convocatoria[x].titular.length; i++){
              if(this.dataService.convocatoria[x].titular[i] == this.fechaPartido){
                (document.getElementById('titular' + this.jugadoresId[x].id) as HTMLIonCheckboxElement).checked = true
              }
            }

      }
    }
  }

  quitarTitular(jugador){
    if((document.getElementById('titular' + jugador) as HTMLIonCheckboxElement).checked == true){
      (document.getElementById('titular' + jugador) as HTMLIonCheckboxElement).checked = false
    }
  }

  golLoc(){
    var text = (document.getElementById('localGol') as HTMLIonLabelElement).textContent
    var num = parseInt(text);
    num++;
    (document.getElementById('localGol') as HTMLIonLabelElement).textContent = num.toString()
  }
  delGolLoc(){
    var text = (document.getElementById('localGol') as HTMLIonLabelElement).textContent
    var num = parseInt(text);
    if(num>0){
      num--;
    }
    (document.getElementById('localGol') as HTMLIonLabelElement).textContent = num.toString()
  }

  golVis(){
    var text = (document.getElementById('visitanteGol') as HTMLIonLabelElement).textContent
    var num = parseInt(text);
    num++;
    (document.getElementById('visitanteGol') as HTMLIonLabelElement).textContent = num.toString()
  }
  delGolVis(){
    var text = (document.getElementById('visitanteGol') as HTMLIonLabelElement).textContent
    var num = parseInt(text);
    if(num>0){
      num--;
    }
    (document.getElementById('visitanteGol') as HTMLIonLabelElement).textContent = num.toString()
  }

  guardarCambios(){
    try{    
    //PartidoFinalizado
    var parFinalizado = false
    var miBool = Boolean(this.parFinalizado)

    console.log(this.dataService.getPathPartidos())
    if((document.getElementById('parFinalizado') as HTMLIonToggleElement).checked == true && miBool == false){
      parFinalizado = true
      firebase.firestore().collection(this.dataService.getPathPartidos()).doc(this.idPartido).update({finalizado: parFinalizado})
    } 
    if((document.getElementById('parFinalizado') as HTMLIonToggleElement).checked == false && miBool == true){
      firebase.firestore().collection(this.dataService.getPathPartidos()).doc(this.idPartido).update({finalizado: parFinalizado})
    } 

    //Campo Convocatoria

    for(var i = 0; this.jugadoresId.length > i; i++){
      this.updateConvocatoria(this.jugadoresId[i].id)
    }

    //Campo Titular

    for(var i = 0; this.jugadoresId.length > i; i++){
      this.updateTitular(this.jugadoresId[i].id)
    }

  }catch(err){
    console.log(err)
  }

  }
  async updateConvocatoria(jugadorId) {

    var num = 0
    var checkedConv = ""
    var bool = false

    //Para saber posicion del array de asistencia
    for(var i = 0; i<this.jugadoresId.length; i++){
      if(this.jugadoresId[i].id == jugadorId){
        num = i
      }
    }
      //Comprobar si existe la fecha en asiste
      for(var i = 0; i<this.dataService.convocatoria[num].convocado.length; i++){
        if(this.dataService.convocatoria[num].convocado[i] == this.fechaPartido){
          checkedConv = "convocado"
        }
      }

      //Comprobar si existe la fecha en falta
      for(var i = 0; i<this.dataService.convocatoria[num].desconvocado.length; i++){
        if(this.dataService.convocatoria[num].desconvocado[i] == this.fechaPartido){
          checkedConv = "desconvocado"
        }
      }

      //Si no se ha registrado aun esta fecha
      if (checkedConv != 'convocado' && checkedConv != 'desconvocado') {

        //Si no está marcado...
        if ((document.getElementById('convocado' + jugadorId) as HTMLIonCheckboxElement).checked == false && bool == false) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.convocatoria[num].id).update({
            desconvocado: firebase.firestore.FieldValue.arrayUnion(this.fechaPartido)
          });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.convocatoria[num].id).update({
            convocado: firebase.firestore.FieldValue.arrayRemove(this.fechaPartido)
          });
          bool = true
        }
    
        //Si está marcado...
        if ((document.getElementById('convocado' + jugadorId) as HTMLIonCheckboxElement).checked == true && bool == false) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.convocatoria[num].id).update({
            convocado: firebase.firestore.FieldValue.arrayUnion(this.fechaPartido)
          });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.convocatoria[num].id).update({
            desconvocado: firebase.firestore.FieldValue.arrayRemove(this.fechaPartido)
          });
          bool = true
        }
      }

      //Si se ha registrado esta fecha en asistencia se elimina de asistencia y se añade en falta
      if (checkedConv == 'convocado' && bool == false) {

        //Si no está marcado...
        if ((document.getElementById('convocado' + jugadorId) as HTMLIonCheckboxElement).checked == false) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.convocatoria[num].id).update({
            desconvocado: firebase.firestore.FieldValue.arrayUnion(this.fechaPartido)
          });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.convocatoria[num].id).update({
            convocado: firebase.firestore.FieldValue.arrayRemove(this.fechaPartido)
          });
          bool = true
        }
      }

      //Si se ha registrado esta fecha en falta se elimina de falta y se añade en asistencia
      if (checkedConv == 'desconvocado' && bool == false) {
    
        //Si está marcado...
        if ((document.getElementById('convocado' + jugadorId) as HTMLIonCheckboxElement).checked == true) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.convocatoria[num].id).update({
            convocado: firebase.firestore.FieldValue.arrayUnion(this.fechaPartido)
          });
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.convocatoria[num].id).update({
            desconvocado: firebase.firestore.FieldValue.arrayRemove(this.fechaPartido)
          });
          bool = true
        }
      }

    
  }

  async updateTitular(jugadorId) {

    var num = 0
    var checkedTitular = ""
    var bool = false

    //Para saber posicion del array de convocatoria
    for(var i = 0; i<this.jugadoresId.length; i++){
      if(this.jugadoresId[i].id == jugadorId){
        num = i
      }
    }
      //Comprobar si existe la fecha en titular
      for(var i = 0; i<this.dataService.convocatoria[num].titular.length; i++){
        if(this.dataService.convocatoria[num].titular[i] == this.fechaPartido){
          checkedTitular = "titular"
        }
      }

      //Si no se ha registrado aun esta fecha
      if (checkedTitular != 'titular') {

        //Si no está marcado...
        if ((document.getElementById('titular' + jugadorId) as HTMLIonCheckboxElement).checked == false && bool == false) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.convocatoria[num].id).update({
            titular: firebase.firestore.FieldValue.arrayRemove(this.fechaPartido)
          });
          bool = true
        }
    
        //Si está marcado...
        if ((document.getElementById('titular' + jugadorId) as HTMLIonCheckboxElement).checked == true && bool == false) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.convocatoria[num].id).update({
            titular: firebase.firestore.FieldValue.arrayUnion(this.fechaPartido)
          });
          bool = true
        }
      }

      //Si se ha registrado esta fecha en convocatoria se elimina de asistencia y se añade en falta
      if (checkedTitular == 'titular' && bool == false) {

        //Si no está marcado...
        if ((document.getElementById('titular' + jugadorId) as HTMLIonCheckboxElement).checked == false) {
          firebase.firestore().collection(this.dataService.pathJugadores + jugadorId + '/estadisticas').doc(this.dataService.convocatoria[num].id).update({
            titular: firebase.firestore.FieldValue.arrayRemove(this.fechaPartido)
          });
          bool = true
        }
      }   
  }

}
