import Menu from "./Menu.ts";

interface ProductosPedidosConstructor{
    id: number;
    menu: Menu;
    fecha: Date | number;
    cantidad: number;
    descuento: number;
}

export default class ProductosPedidos {
    public id: number;
    public menu: Menu;
    public fecha: Date;
    public cantidad: number;
    public descuento: number;

    constructor (params: ProductosPedidosConstructor){
        this.id = params.id;
        this.menu = params.menu;
        if(params.fecha instanceof Date){
            this.fecha = params.fecha;
        }else{
            this.fecha = new Date(params.fecha);
        }
        this.cantidad = params.cantidad;
        this.descuento = params.descuento;
    }

    public calcularValorConDescuento(){
        const valorSinDescuento = this.menu.precio * this.cantidad;

        const valorConDescuento = valorSinDescuento - (valorSinDescuento * this.descuento);

        return valorConDescuento;
    }


}
