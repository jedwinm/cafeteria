import type { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import LoginIsland from "../islands/Login.tsx";
import * as cookie from "https://deno.land/std@0.224.0/http/cookie.ts";
import Provider from "../lib/utils/provider.ts";
import UsuarioAutenticableRepo from "../lib/repositories/UsuarioAutenticableRepo.ts";

export const handler: Handlers = {
    async GET(_req: Request, ctx: HandlerContext) {
        const cookies = cookie.getCookies(_req.headers);
        if (cookies["USER_ID"] && cookies["USER_ID"] !== "") {
            return new Response(null, {
                status: 302,
                headers: {
                    "Location": "/",
                },
            });
        }

        return await ctx.render();
    },

    async POST(_req: Request, _ctx: HandlerContext) {
        const repo = Provider.get<UsuarioAutenticableRepo>(
            "repo:usuarioAutenticable",
        );
        const requestData = (await _req.json()) as {
            identification?: string;
            password?: string;
        };

        const usuario = await repo.login(
            parseInt(requestData.identification ?? "0"),
            requestData.password ?? "",
        );

        const response = new Response(
            JSON.stringify({
                ok: usuario !== null,
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        if (usuario !== null) {
            cookie.setCookie(response.headers, {
                name: "USER_ID",
                value: usuario.id?.toString() ?? "",
            });
        }

        return response;
    },
};

export default function Login({}: PageProps) {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Iniciar sesión
                    </h2>
                    <LoginIsland />
                </div>
            </div>
        </>
    );
}
