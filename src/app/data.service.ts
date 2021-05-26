import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Asistencia, Convocatoria, Entrenamiento, JugadorId } from './interfaces';
@Injectable({
  providedIn: 'root'
})
export class DataService {
pathJugadores: string;
pathJugadoresEstadistica: string;
jugadoresId: Array<JugadorId>
pathPartidos: string;
pathEntrenamientos: string;
numEntrenamiento: string; 
idEntrenamiento: string;
finEntrenamiento: string;
fechaEntrenamiento: string;
asistencia: Array<Asistencia>;
entrenamientos: Array<any>
equipoSelect: string;
plataforma: string;
partidos: Array<any>
numPartido: string;
idPartido: string;
parFinalizado: string;
fechaPartido: string;
convocatoria: Array<Convocatoria>;
emailUser: string;


  constructor(private http: HttpClient) { 
    this.pathJugadores = ""
    this.pathJugadoresEstadistica = ""
    this.pathPartidos = ""
    this.pathEntrenamientos = ""
    this.numEntrenamiento = ""
    this.jugadoresId = []
    this.idEntrenamiento = ""
    this.finEntrenamiento = ""
    this.fechaEntrenamiento = ""
    this.asistencia = []
    this.entrenamientos = []
    this.equipoSelect = ""
    this.plataforma = ""
    this.partidos = []
    this.numPartido = ""
    this.idPartido = ""
    this.parFinalizado = ""
    this.fechaPartido = ""
    this.convocatoria = []  
    this.emailUser = ""
  }


  getJugadores(){
    return this.jugadoresId
  }

  getPathJugadores(){
    return this.pathJugadores
  }

  getPathJugadoresEstadistica(){
    return this.pathJugadoresEstadistica
  }

  // getJugadores(){
  //   return this.http.get('/assets/data/jugadores.json');
  // }

  getPathPartidos(){
    return this.pathPartidos
  }

  getPathEntrenamientos(){
    return this.pathEntrenamientos
  }


}
