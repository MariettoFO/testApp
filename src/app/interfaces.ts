export interface User {
    nombre: string;
    telefono: string;
    correo: string;
    master: Array<AccesoUsuario>;
    entrenador: Array<AccesoUsuario>
}

export interface AccesoUsuario {
    nombre: string;
    password: string;
}

export interface Equipo {
    nombre: string;
    minutos: string;
    modalidad: string;
    convocados: string;
}

export interface EquipoId {
    id: string;
    nombre: string;
    minutos: string;
    modalidad: string;
    convocados: string;
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
    convocado: Array<string>;
    desconvocado: Array<string>;
    titular: Array<string>;
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

export interface Convocatoria{
    id: string;
    convocado: Array<string>
    desconvocado: Array<string>
    titular: Array<string>
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

export interface PartidoId {
    id: string;
    jornada: number;
    rival: string;
    campo: string;
    fecha: string;
    hora: string;
    finalizado: boolean;
}

export interface Partido {
    jornada: number;
    rival: string;
    campo: string;
    fecha: string;
    hora: string;
    finalizado: boolean;
    resultado: string;
}

export interface Peticiones {
    nombre: string;
    email: string;
    telefono: string;
    tipo: string;
    revisado: boolean;
}
