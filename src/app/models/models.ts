export interface Usuario {
    nombre: string;
    apellido: string;
    password: string;
    correo: string;
    uid: string;
    perfil: 'Conductor' | 'Pasajero';
}

export interface Viaje {
    nconductor: string;
    cantidad: number;
    precio: number;
    id: string;
    fecha: Date;
    hora: Date;
}