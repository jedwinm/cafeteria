import Pedido from "./Pedido.ts";
import UsuarioAutenticable from "./UsuarioAutenticable.ts";
import Cliente from "./Cliente.ts";

export interface FacturaConstructor{
    id: number;
    pedido: Pedido;
    cajero: UsuarioAutenticable;
    cliente: Cliente;
    fechaCreacion: Date | number;
    valorNeto: number;
    iva: number
}

export default class Factura{
    public id: number;
    public pedido: Pedido;
    public cajero: UsuarioAutenticable;
    public cliente: Cliente;
    public fechaCreacion: Date | number;
    public valorNeto: number;
    public iva: number

    constructor(params: FacturaConstructor){
        this.id = params.id;
        this.pedido = params.pedido;
        this.cajero = params.cajero;
        this.cliente = params.cliente;
        if (params.fechaCreacion instanceof Date) {
            this.fechaCreacion = params.fechaCreacion;            
        }else{
            this.fechaCreacion = new Date(params.fechaCreacion);
        }
        this.valorNeto = params.valorNeto;
        this.iva = params.iva;
    }
    
    public calcularValorNeto(): number{
        const valorTotalFactura = this.valorNeto + (this.valorNeto * this.iva);
        return valorTotalFactura;
    }

}