interface MenuConstructor {
    id: number | null;
    precio: number;
    descripcion: string;
    imagen: string;
    categorias: string[] | string;
}

export default class Menu {
    public id: number | null;
    public precio: number;
    public descripcion: string;
    public imagen: string;
    public categorias: string[];

    constructor(params: MenuConstructor) {
        this.id = params.id;
        this.precio = params.precio;
        this.descripcion = params.descripcion;
        this.imagen = params.imagen;
        if (typeof params.categorias === 'string') {
            this.categorias = params.categorias.split(';');
        } else {
            this.categorias = params.categorias;
        }
    }
}