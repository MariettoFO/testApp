import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
pathJugadores: string;
  constructor(private http: HttpClient) { 
    this.pathJugadores = ""
  }


  getPathJugadores(){
    return this.pathJugadores
  }

  getJugadores(){
    return this.http.get('/assets/data/jugadores.json');
  }
}
