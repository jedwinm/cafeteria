import type { HandlerContext } from "$fresh/server.ts";
import UsuarioRepo from "../../../lib/repositories/UsuarioRepo.ts";
import Provider from "../../../lib/utils/provider.ts";

export const handler = async (_req: Request, _ctx: HandlerContext) => {
  const userRepo = Provider.get<UsuarioRepo>("repo:usuario");

  const user = await userRepo.readById(1);
  if (!user) {
    return new Response(JSON.stringify(user), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
