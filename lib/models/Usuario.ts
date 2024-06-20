export enum EstadoUsuario {
    HABILITADO,
    DESHABILITADO,
}

export interface UsuarioConstructor {
    id: number | null;
    fechaCreacion: Date | number;
    estado: EstadoUsuario | number;
    nombres: string;
    apellidos: string;
    cedula: number;
    correo: string;
    telefono: number;
}

export default class Usuario {
    public id: number | null;
    public fechaCreacion: Date;
    public estado: EstadoUsuario;
    public nombres: string;
    public apellidos: string;
    public cedula: number;
    public correo: string;
    public telefono: number;

    constructor(params: UsuarioConstructor) {
        this.id = params.id;
        if (params.fechaCreacion instanceof Date) {
            this.fechaCreacion = params.fechaCreacion;
        } else {
            this.fechaCreacion = new Date(params.fechaCreacion);
        }
        this.estado = params.estado;
        this.nombres = params.nombres;
        this.apellidos = params.apellidos;
        this.cedula = params.cedula;
        this.correo = params.correo;
        this.telefono = params.telefono;
    }
}