import Factura from "./Factura.ts";
import Usuario from "./Usuario.ts";

interface UsuarioConstructor{
    id: number;
    usuario: Usuario;
    fechaUltimaVisita: Date | number;
}



export default class Cliente{
    public id: number;
    public usuario: Usuario;
    public fechaUltimaVisita: Date | number;

    constructor(params: UsuarioConstructor){
        this.id = params.id;
        this.usuario = params.usuario;
        this.fechaUltimaVisita = params.fechaUltimaVisita;

    }

    /* haria falta la funcion de fechaUltimaVisita(factura)*/

    public actualizarFechaUltimaVisita(factura: Factura): void{
        this.fechaUltimaVisita = factura.fechaCreacion;
    }
}