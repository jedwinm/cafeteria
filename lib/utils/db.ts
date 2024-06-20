import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";
import config from "../../config.ts";

export default async function getDatabase() {
  return await new Client().connect({
    hostname: config.mysql.host,
    username: config.mysql.username,
    db: config.mysql.name,
    password: config.mysql.password,
  });
}
