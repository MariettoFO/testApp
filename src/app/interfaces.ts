export interface User {
    nombre: string;
    telefono: string;
    correo: string;
    // equipos: string;
}

export interface Equipo {
    id: string;
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

export interface JugadorEstadistica {

    asiste: Array<string>;
    falta: Array<string>;
    convocado: number;
    desconvocado: number;
    goles: number;
    asistencias: number;
    minutos: number;
    amarillas: number;
    rojas: number;
    
}

export interface Asistencia{
    id: string;
    asiste: Array<string>
    falta: Array<string>
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
