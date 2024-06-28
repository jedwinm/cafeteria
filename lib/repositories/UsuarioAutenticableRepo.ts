import UsuarioAutenticable from "../models/UsuarioAutenticable.ts";
import Provider from "../utils/provider.ts";
import { type IRepository } from "./index.ts";
import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";
import UsuarioRepo from "./UsuarioRepo.ts";
import {hashContrasena} from "../utils/contrasena.ts";

export default class UsuarioAutenticableRepo
    implements IRepository<UsuarioAutenticable> {
    private db: Client;
    private usuarioRepository: UsuarioRepo;
    constructor() {
        this.db = Provider.get("db");
        this.usuarioRepository = Provider.get("repo:usuario");
    }

    public async create(
        model: UsuarioAutenticable,
    ): Promise<UsuarioAutenticable> {
        const _model = await this.usuarioRepository.create(model);

        const { contrasena, forzarCambioContrasena } = model
            .obtenerParametrosDB();

        const result = await this.db.execute(
            `INSERT INTO usuarios_autenticables VALUES (?, ?, ?, ?)`,
            [
                _model.id,
                model.fechaUltimaSesion,
                contrasena,
                forzarCambioContrasena,
            ],
        );

        if (!result.lastInsertId || result.affectedRows == 0) {
            throw new Error(`error creating usuario`);
        }

        model.id = _model.id;
        return model;
    }

    public async delete(model: number | UsuarioAutenticable): Promise<void> {
        const id = (model instanceof UsuarioAutenticable) ? model.id : model;
        await this.db.execute(
            `DELETE FROM usuarios_autenticables WHERE id = ?`,
            [id],
        );

        await this.usuarioRepository.delete(model);
    }

    public async update(model: UsuarioAutenticable): Promise<void> {
        await this.db.transaction(async (conn) => {
            const parameters: {[k: string]: string} = {
                fechaUltimaSesion: 'fecha_ultima_sesion',
                contrasena: 'contrasena',
                forzarCambioContrasena: 'forzar_cambio_contrasena',
            };
            for (const key of Object.keys(parameters)) {
                const keyDb = parameters[key];
                await conn.execute(`UPDATE usuarios SET ?? = ? WHERE id = ?`, [
                    keyDb,
                    // deno-lint-ignore no-explicit-any
                    (model as any)[key],
                    model.id,
                ]);
            }
        });
    }

    public async readById(id: number): Promise<UsuarioAutenticable | null> {
        const result = await this.db.query(`
            SELECT
                u.id,
                u.fecha_creacion,
                u.estado,
                u.nombres,
                u.apellidos,
                u.cedula,
                u.correo,
                u.telefono,
                ua.fecha_ultima_sesion,
                ua.contrasena,
                ua.forzar_cambio_contrasena
            FROM usuarios AS u
                INNER JOIN usuarios_autenticables AS ua
                    ON u.id = ua.id
            WHERE u.id = ?
                LIMIT 1
        `, [id]);

        if (result.length != 1) {
            return null;
        }

        return new UsuarioAutenticable({
            id: result[0].id,
            fechaCreacion: result[0].fecha_creacion,
            estado: result[0].estado,
            nombres: result[0].nombres,
            apellidos: result[0].apellidos,
            cedula: result[0].cedula,
            correo: result[0].correo,
            telefono: result[0].telefono,
            fechaUltimaSesion: result[0].fecha_ultima_sesion,
            contrasena: result[0].contrasena,
            forzarCambioContrasena: result[0].forzar_cambio_contrasena,
        });
    }

    public async login(cedula: number, contrasena: string): Promise<UsuarioAutenticable | null> {
        const contrasenaHash = await hashContrasena(contrasena);
        const result = await this.db.query(`
            SELECT
                ua.id
            FROM usuarios_autenticables AS ua
                INNER JOIN usuarios AS u
                    ON u.id = ua.id
            WHERE u.cedula = ? AND ua.contrasena = ?`, [cedula, contrasenaHash]);

        if (result.length != 1) {
            return null;
        }

        return await this.readById(result[0].id);
    }
}
