import Usuario, { UsuarioConstructor } from './Usuario.ts';
import { hashContrasena } from '../utils/contrasena.ts'


export interface UsuarioAutenticableConstructor extends UsuarioConstructor {
    fechaUltimaSesion: Date | number;
    contrasena: string;
    forzarCambioContrasena: boolean;
}

export default class UsuarioAutenticable extends Usuario {
    public fechaUltimaSesion: Date;
    private contrasena: string;
    protected forzarCambioContrasena: boolean;

    constructor(params: UsuarioAutenticableConstructor) {
        super(params);

        if (params.fechaUltimaSesion instanceof Date) {
            this.fechaUltimaSesion = params.fechaUltimaSesion;
        } else {
            this.fechaUltimaSesion = new Date(params.fechaUltimaSesion);
        }

        this.contrasena = '';
        this.asignarContrasena(params.contrasena);
        this.forzarCambioContrasena = params.forzarCambioContrasena;
    }

    private async asignarContrasena(contrasena: string) {
        this.contrasena = await hashContrasena(contrasena);
    }

    public async cambiarContrasena(contrasenaActual: string, nuevaContrasena: string) {
        if (await hashContrasena(contrasenaActual) == this.contrasena) {
            this.asignarContrasena(nuevaContrasena);
            return;
        }

        throw new Error('the password is not valid');
    }
    
    public forzarElCambioContrasena() {
        this.forzarCambioContrasena = true;
    }
}