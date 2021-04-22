export interface User {
    equipos: string;
}

export interface Equipo {
    nombre: string;
}

export interface Jugador {

    nombre: string;
    apellidos: string;
    apodo: string;
    dorsal: string;
    posicion: string;
    edad: string;
}

export interface JugadorId {
    id: string;
    nombre: string;
    apellidos: string;
    apodo: string;
    dorsal: string;
    posicion: string;
    edad: string;
}

export interface Entrenamiento {
    numero: number;
    fecha: string;
    hora: string;
    finalizado: boolean;
}

export interface EntrenamientoId {
    id: string;
    numero: number;
    fecha: string;
    hora: string;
    finalizado: boolean;
}

export interface Partido {
    id: string;
    nombre: string;
    apellidos: string;
    apodo: string;
    dorsal: string;
    posicion: string;
    edad: string;
}
