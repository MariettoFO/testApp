import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { ModalController } from '@ionic/angular';
import { HomeModalPage } from '../home-modal/home-modal.page';
import { FirebaseService} from '../services/firebase.service'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { MaxLengthValidator } from '@angular/forms';
import { SelectorMatcher } from '@angular/compiler';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  constructor( private modalCtrl: ModalController,
    // public firebaseService: FirebaseService
    ) { 
      this.equipos = []
      this.team = []
    }

    equipoSelect: string
    equipos: Array<string>;
    team: Array<string>;
    idEquipos: Array<string>;

  ngOnInit() {
    this.cargarEquipos()    
  }

  segmentChanged(event){
    const valorSegmento = event.detail.value;
  }

  async abrirModalEquipo(){
    const modal = await this.modalCtrl.create({
      component: HomeModalPage,
      componentProps:{
        equipo: 'CD San Roque EFF',
        icono: '../../assets/icon/favicon.png'
      }
    });

    await modal.present();

    const {data} = await modal.onDidDismiss();
    console.log('retorno del modal', data);
  }


  cargarEquipos(){
    // this.equipos = []
    // this.team = []
    // this.idEquipos = []
    const db = firebase.firestore();

    const getEquipos = db.collection('users/' + firebase.auth().currentUser.uid + '/equipos/').get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc =>
        this.team.push(doc.data().nombre)),
        this.equipos = this.team
      })

      db.collection('users/' + firebase.auth().currentUser.uid + '/equipos/').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            var hola = true
            if(hola == true){
              this.team.push(doc.data().nombre);
              this.idEquipos.push(doc.id);
              console.log(this.team + "==>" + this.idEquipos);
              return this.team;
            }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    console.log(this.team + "==>" + this.idEquipos)
    // this.equipos = team
    // const getIdEquipos = db.collection('users/' + firebase.auth().currentUser.uid + '/equipos/').get().then((querySnapshot) => {
    //   querySnapshot.docs.forEach(doc =>
    //     this.idEquipos.push(doc.id))
    // })
    // this.team = this.equipos
    return this.equipos
  }

  cargarId(){

    this.idEquipos = []
    var idteam: any[]
    const db = firebase.firestore();
    const getIdEquipos = db.collection('users/' + firebase.auth().currentUser.uid + '/equipos/').get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc =>
        idteam.push(doc.id))
    })

    this.idEquipos = idteam

    console.log(this.idEquipos)

    return this.idEquipos

  }

  equipoSeleccionado(equipo){

    // this.equipoSelect = (document.getElementById("nombre") as HTMLLabelElement).textContent;
    this.equipoSelect = equipo
    console.log(this.equipoSelect + " es el equipo seleccionado")

    return this.equipoSelect
  }

  getIdEquipo(team){
    var idEquipo = ""
    var x = false
    var id = []

    this.idEquipos = this.cargarId()
    this.equipos=this.cargarEquipos()
    for(var i = 0; (i <= this.equipos.length) && (x == false); i++){
      if(team == this.equipos[i]){
        idEquipo=this.idEquipos[i];
        x = true;
      }
    }

    return idEquipo
  }

  doRefresh(event){
    setTimeout(() => {
      this.cargarEquipos()
      event.target.complete();
    }, 1500);
  }


}