import Usuario from "../models/Usuario.ts";
import Provider from "../utils/provider.ts";
import { type IRepository } from "./index.ts";
import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";

export default class UsuarioRepo implements IRepository<Usuario> {
  private db: Client;
  constructor() {
    this.db = Provider.get("db");
  }

  public async create(model: Usuario): Promise<Usuario> {
    const createdRow = await this.db.execute(
        `INSERT INTO usuarios VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?)`,
        [model.fechaCreacion, model.estado, model.nombres, model.apellidos, model.cedula, model.correo, model.telefono]
    )

    if (!createdRow.lastInsertId || createdRow.affectedRows == 0) {
        throw new Error(`error creating usuario`);
    }

    model.id = createdRow.lastInsertId;
    return model;
  }

  public async readById(id: number): Promise<Usuario | null> {
    const result = await this.db.query(`SELECT id, fecha_creacion, estado, nombres, apellidos, cedula, correo, telefono FROM usuarios WHERE id = ? LIMIT 1`, [id]);
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
        const parameters = ['estado', 'nombres', 'apellidos', 'cedula', 'correo', 'telefono'];
        for (const key of parameters) {
            // deno-lint-ignore no-explicit-any
            await conn.execute(`UPDATE usuarios SET ?? = ? WHERE id = ?`, [key, (model as any)[key], model.id]);
        }
    });
  }

  public async delete(model: number | Usuario): Promise<void> {
    const id = (model instanceof Usuario)? model.id : model;
    await this.db.execute(`DELETE FROM usuarios WHERE id = ?`, [id]);
  }
}
