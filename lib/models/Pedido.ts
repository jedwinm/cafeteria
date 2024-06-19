import ProductosPedidos from "./ProductosPedidos.ts";
import Mesero from "./Mesero.ts";



interface PedidoConstructor{
    id: number;
    productosPedido: ProductosPedidos[];
    fecha: Date | number;
    mesero: Mesero;
    mesa: number;
    estado: number;
}

export default class Pedido{
    public id: number;
    public productosPedido: ProductosPedidos[];
    public fecha: Date | number;
    public mesero: Mesero;
    public mesa: number;
    public estado: number;

    constructor(params: PedidoConstructor){
        this.id = params.id;
        this.productosPedido = params.productosPedido;
        if (params.fecha instanceof Date) {
            this.fecha = params.fecha;
        } else {
            this.fecha = new Date(params.fecha);
        }
        this.mesero = params.mesero;
        this.mesa = params.mesa;
        this.estado = params.estado;
    }

    public agregarProducto(producto: ProductosPedidos){
        this.productosPedido.push(producto);
    }

}