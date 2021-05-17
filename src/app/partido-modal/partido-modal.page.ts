import { Component, Input, OnInit } from '@angular/core';
import { AlertController, IonInput, IonLabel, ModalController } from '@ionic/angular';
import { DataService } from '../data.service';
import { Partido } from '../interfaces';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-partido-modal',
  templateUrl: './partido-modal.page.html',
  styleUrls: ['./partido-modal.page.scss'],
})
export class PartidoModalPage implements OnInit {

    constructor(private modalCtrl: ModalController, private alertCtrl: AlertController, private firebaseService: FirebaseService, private dataService: DataService
      ) { 
        
      }

  ngOnInit() {
  }


  salirSinGuardar(){
    this.modalCtrl.dismiss();
  }

  ordenarFecha(fecha){
    var cadenaFinal = ''
    var dia = ''
    var mes = ''
    var anio = ''
  
    if(fecha != undefined && fecha != "" && fecha != null){
      dia = fecha.toString().substring(8,10)
      mes = fecha.toString().substring(5,7)
      anio = fecha.toString().substring(0,4)
  
      cadenaFinal = dia + '/' + mes + '/' + anio
    }
  
    return cadenaFinal
  }

  calcularJornada(){
    var jornada = 0
    if(this.dataService.partidos.length > 0){
        for(var i = 0; this.dataService.partidos.length > i; i++){
          if(jornada < this.dataService.partidos[i].jornada){
            jornada = this.dataService.partidos[i].jornada
          }
        }
        jornada++
      }else{
        jornada = 1
      }
  
      return jornada
  }

  salirGuardando(){
    console.log(this.dataService.getPathPartidos())
    const path = this.dataService.getPathPartidos()
    var boolNum = false
    var boolFecha = false 
    var boolFechaHoraMal = false
    var nuevoPartido: Partido
    var boolNumVacio = false

    if((document.getElementById("hora") as HTMLIonDatetimeElement).value != undefined
    && (document.getElementById("hora") as HTMLIonDatetimeElement).value != null && (document.getElementById("hora") as HTMLIonDatetimeElement).value != ""
    && (document.getElementById("fecha") as HTMLIonDatetimeElement).value != undefined && (document.getElementById("fecha") as HTMLIonDatetimeElement).value != null 
    && (document.getElementById("fecha") as HTMLIonDatetimeElement).value != ""
    && (document.getElementById("rival") as HTMLInputElement).value != undefined && (document.getElementById("rival") as HTMLInputElement).value != null 
    && (document.getElementById("rival") as HTMLInputElement).value != ""
    && (document.getElementById("campo") as HTMLIonSelectElement).value != undefined && (document.getElementById("campo") as HTMLIonSelectElement).value != null 
    && (document.getElementById("campo") as HTMLIonSelectElement).value != ""){

      nuevoPartido = {
        jornada: this.calcularJornada(),
        rival: (document.getElementById("rival") as HTMLInputElement).value,
        campo: (document.getElementById("campo") as HTMLIonSelectElement).value,
        fecha: this.ordenarFecha((document.getElementById("fecha") as HTMLIonDatetimeElement).value.toString().substring(0,10)),
        hora: (document.getElementById("hora") as HTMLIonDatetimeElement).value.toString().substring(11,16),
        finalizado: false,
        resultado: ""
      }  
    } else {
      boolFechaHoraMal = true
    }


      for( var i = 0; i<this.dataService.partidos.length; i++){
        if(nuevoPartido != undefined){
          if(nuevoPartido.jornada == this.dataService.partidos[i].jornada){
            boolNum = true
          }
          if(nuevoPartido.fecha == this.dataService.partidos[i].fecha){
            boolFecha = true
          }
        }
      }

      if(boolNum == false && boolFecha == false && boolFechaHoraMal == false && boolNumVacio == false){
        this.firebaseService.crearEquipo<Partido>(nuevoPartido, path)
        this.modalCtrl.dismiss({
        });
      } else {
        if(boolNum == true){
          this.alertCtrl.create({
            header: "Error al crear",
            message: "El número de partido introducido ya existe.",
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
            message: "Ya existe un partido programado en la fecha seleccionada.",
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
            message: "Por favor, asegúrese de rellenar todos los campos.",
            buttons:[{
              text:'ok',
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


