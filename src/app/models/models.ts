export interface Usuario {
    nombre: string;
    apellido: string;
    password: string;
    correo: string;
    uid: string;
    perfil: 'Conductor' | 'Pasajero';
}

export interface Viaje {
    cantidad: number;
    precio: number;
    id: string;
    horario: Date;
}