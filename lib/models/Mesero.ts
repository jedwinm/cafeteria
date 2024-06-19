import UsuarioAutenticable, { UsuarioAutenticableConstructor } from "./UsuarioAutenticable.ts";

export default class Mesero extends UsuarioAutenticable{

    constructor(params: UsuarioAutenticableConstructor){
        super(params);
    }
}