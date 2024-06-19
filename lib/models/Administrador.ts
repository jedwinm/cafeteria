import UsuarioAutenticable, {UsuarioAutenticableConstructor} from "./UsuarioAutenticable.ts";


export default class Administrador extends UsuarioAutenticable{

    constructor(params: UsuarioAutenticableConstructor){
        super(params);
    }
}