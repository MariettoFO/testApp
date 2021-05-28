import { Component, OnInit } from '@angular/core';
import { GoogleChartComponent, GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

googleChartLibrary

  constructor() { }

  ngOnInit() {
    this.graficoPartidos(); 
    this.graficoGoles();  
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
  drawChartPartidos () {
    // Create the data table.
    var data = new this.googleChartLibrary.visualization.DataTable();
    data.addColumn('string', 'Activity Name');
    data.addColumn('number', 'Partidos');
    data.addRows([
      ['Ganados', 8],
      ['Empatados', 8],
      ['Perdidos', 2],
    ]);

    // Instantiate and draw our chart, passing in some options.
    var chart = new this.googleChartLibrary.visualization.PieChart(document.getElementById('pie-chart-div-partidos') as HTMLIonCardContentElement);

    chart.draw(data, {
      'width': 400,
      'height': 300,
      'colors': ['#32a846', '#ffbb00', '#c41818'],
    });
  }

  drawChartGoles () {
    // Create the data table.
    var data = new this.googleChartLibrary.visualization.DataTable();
    data.addColumn('string', 'Activity Name');
    data.addColumn('number', 'Goles');
    data.addRows([
      ['A favor', 8],
      ['En contra', 8],
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
