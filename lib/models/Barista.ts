import UsuarioAutenticable, {UsuarioAutenticableConstructor} from "./UsuarioAutenticable.ts";

export default class Barista extends UsuarioAutenticable{

    constructor(params: UsuarioAutenticableConstructor){
        super(params);
    }

}