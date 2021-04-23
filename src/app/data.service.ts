import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { JugadorId } from './interfaces';
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

  constructor(private http: HttpClient) { 
    this.pathJugadores = ""
    this.pathJugadoresEstadistica = ""
    this.pathPartidos = ""
    this.pathEntrenamientos = ""
    this.numEntrenamiento = ""
    this.jugadoresId = []
    this.idEntrenamiento = ""
    this.finEntrenamiento = ""
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
