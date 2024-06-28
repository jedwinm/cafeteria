import Usuario from "../models/Usuario.ts";
import Provider from "../utils/provider.ts";
import { type IRepository } from "./index.ts";
import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";

export enum UserRole {
    NO_ROLE = 0,
    BARISTA = 10,
    MESERO = 20,
    ADMIN = 100,
}

export default class UsuarioRepo implements IRepository<Usuario> {
    private db: Client;
    constructor() {
        this.db = Provider.get("db");
    }

    public async create(model: Usuario): Promise<Usuario> {
        const createdRow = await this.db.execute(
            `INSERT INTO usuarios VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?)`,
            [
                model.fechaCreacion,
                model.estado,
                model.nombres,
                model.apellidos,
                model.cedula,
                model.correo,
                model.telefono,
            ],
        );

        if (!createdRow.lastInsertId || createdRow.affectedRows == 0) {
            throw new Error(`error creating usuario`);
        }

        model.id = createdRow.lastInsertId;
        return model;
    }

    public async readById(id: number): Promise<Usuario | null> {
        const result = await this.db.query(
            `SELECT id, fecha_creacion, estado, nombres, apellidos, cedula, correo, telefono FROM usuarios WHERE id = ? LIMIT 1`,
            [id],
        );
        if (result.length != 1) {
            return null;
        }

        return new Usuario({
            id: result[0].id,
            fechaCreacion: result[0].fecha_creacion,
            estado: result[0].estado,
            nombres: result[0].nombres,
            apellidos: result[0].apellidos,
            cedula: result[0].cedula,
            correo: result[0].correo,
            telefono: result[0].telefono,
        });
    }

    public async update(model: Usuario): Promise<void> {
        await this.db.transaction(async (conn) => {
            const parameters = [
                "estado",
                "nombres",
                "apellidos",
                "cedula",
                "correo",
                "telefono",
            ];
            for (const key of parameters) {
                await conn.execute(`UPDATE usuarios SET ?? = ? WHERE id = ?`, [
                    key,
                    // deno-lint-ignore no-explicit-any
                    (model as any)[key],
                    model.id,
                ]);
            }
        });
    }

    public async delete(model: number | Usuario): Promise<void> {
        const id = (model instanceof Usuario) ? model.id : model;
        await this.db.execute(`DELETE FROM usuarios WHERE id = ?`, [id]);
    }

    public async getRole(id: number): Promise<UserRole> {
        const result = await this.db.query(`
            SELECT a.id IS NOT NULL AS admin,
                   m.id IS NOT NULL AS mesero,
                   b.id IS NOT NULL AS barista
            FROM usuarios AS u
                     LEFT JOIN administrador AS a
                               ON a.id = u.id
                     LEFT JOIN mesero AS m
                               ON m.id = u.id
                     LEFT JOIN barista AS b
                               ON b.id = u.id
            WHERE u.id = ?
            LIMIT 1
        `, [id]) as {admin: boolean, mesero: boolean, barista: boolean}[];

        if (result.length != 1) {
            throw new Error(`error getting usuario`);
        }

        if (result[0].admin) return UserRole.ADMIN;
        if (result[0].mesero) return UserRole.MESERO;
        if (result[0].barista) return UserRole.BARISTA;

        return UserRole.NO_ROLE;
    }
}
