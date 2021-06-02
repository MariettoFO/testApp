import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/app';
import { GoogleChartComponent, GoogleChartInterface } from 'ng2-google-charts';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

googleChartLibrary
jugados: Array<any>
victoria: number
empate: number
derrota: number
favor: number
contra: number
noGoles: boolean

  constructor(public dataService: DataService, private alertCtrl: AlertController) {
    this.jugados = []
    this.victoria = 0
    this.empate = 0
    this.derrota = 0
    this.favor = 0
    this.contra = 0
    this.noGoles = true
   }

  ngOnInit() {
    this.getFinalizados()
  }
  
  graficoPartidos() {
    this.googleChartLibrary = (<any>window).google;
    // Load the Visualization API and the corechart package.
    this.googleChartLibrary.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    this.googleChartLibrary.charts.setOnLoadCallback(this.drawChartPartidos.bind(this));
  }

  graficoGoles() {
    this.googleChartLibrary = (<any>window).google;
    // Load the Visualization API and the corechart package.
    this.googleChartLibrary.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    this.googleChartLibrary.charts.setOnLoadCallback(this.drawChartGoles.bind(this));
  }
  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.

  async calcularGoles(){

    // await this.getFinalizados()

    for(var i = 0; i<this.dataService.partidosFinalizados.length; i++){
      if(this.dataService.partidosFinalizados[i].campo == 'local'){
        var result = this.dataService.partidosFinalizados[i].resultado.split('-');
        this.favor += parseInt(result[0])
        this.contra += parseInt(result[1])
      }
      if(this.dataService.partidosFinalizados[i].campo == 'visitante'){
        var result = this.dataService.partidosFinalizados[i].resultado.split('-');
        this.contra += parseInt(result[0])
        this.favor += parseInt(result[1])
      }
    }

    if(this.favor == 0 && this.contra == 0 && this.dataService.partidosFinalizados.length > 0){
      this.noGoles = true
    }
  }

  async calcularResultados(){
    // await this.getFinalizados()

    for(var i = 0; i<this.dataService.partidosFinalizados.length; i++){
      if(this.dataService.partidosFinalizados[i].campo == 'local'){
        var result = this.dataService.partidosFinalizados[i].resultado.split('-');
        if(result[0] < result[1]){
          this.derrota++
        }
        if(result[0] == result[1]){
          this.empate++
        }
        if(result[0] > result[1]){
          this.victoria++
        }
      }
      if(this.dataService.partidosFinalizados[i].campo == 'visitante'){
        var result = this.dataService.partidosFinalizados[i].resultado.split('-');
        if(result[0] < result[1]){
          this.victoria++
        }
        if(result[0] == result[1]){
          this.empate++
        }
        if(result[0] > result[1]){
          this.derrota++
        }
      }
    }
  }

  getFinalizados(){
  
      firebase.firestore().collection(this.dataService.getPathPartidos()).where('finalizado', '==', true).orderBy('jornada').onSnapshot((querySnapshot) => {
        var entact = [];
        querySnapshot.forEach((doc) =>{
          entact.push({id: doc.id,
            jornada: doc.data().jornada, 
            rival: doc.data().rival, 
            campo: doc.data().campo,
            fecha: doc.data().fecha,
            hora: doc.data().hora,
            resultado: doc.data().resultado,
            finalizado: doc.data().finalizado})      
          });
  
        this.jugados = entact
        this.dataService.partidosFinalizados = entact

        if(this.dataService.partidosFinalizados.length > 0){
          this.graficoPartidos(); 
          this.graficoGoles(); 
        }

        // if(this.dataService.partidosFinalizados.length == 0){
        //   (document.getElementsByClassName('welcome-card') as unknown as HTMLIonCardElement).style.display = 'none'
        // }
      })
      

  
      return this.jugados
  }

  async drawChartPartidos () {

    await this.calcularResultados()
    // Create the data table.
    var data = new this.googleChartLibrary.visualization.DataTable();
    data.addColumn('string', 'Activity Name');
    data.addColumn('number', 'Partidos');
    data.addRows([
      ['Ganados', this.victoria],
      ['Empatados', this.empate],
      ['Perdidos', this.derrota],
    ]);

    // Instantiate and draw our chart, passing in some options.
    var chart = new this.googleChartLibrary.visualization.PieChart(document.getElementById('pie-chart-div-partidos') as HTMLIonCardContentElement);

    chart.draw(data, {
      'width': 400,
      'height': 300,
      'colors': ['#32a846', '#ffbb00', '#c41818'],
    });
  }

  async infoAlert(){
    await this.alertCtrl.create({
      header: "Ayuda",
      message: "En esta página podrás ver las estadísticas de los entrenamientos y partidos finalizados.",
      buttons:[{
        text:'¡Entendido!',
        // handler:()=>{
        //   this.navCtr.navigateBack(['entrenamiento-modal'])
        // }
      }]
    }).then(alert => alert.present())
  }

  async drawChartGoles () {

    await this.calcularGoles()
    // Create the data table.
    var data = new this.googleChartLibrary.visualization.DataTable();
    data.addColumn('string', 'Activity Name');
    data.addColumn('number', 'Goles');
    data.addRows([
      ['A favor', this.favor],
      ['En contra', this.contra],
    ]);

    // Instantiate and draw our chart, passing in some options.
    var chart = new this.googleChartLibrary.visualization.PieChart(document.getElementById('pie-chart-div-goles') as HTMLIonCardContentElement);

    chart.draw(data, {
      'width': 400,
      'height': 300,
      'colors': ['#32a846', '#c41818'],
    });
  }
}
