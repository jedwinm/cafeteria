import type { FreshContext, PageProps } from "$fresh/server.ts";
import * as cookie from "https://deno.land/std@0.224.0/http/cookie.ts";
import Provider from "../lib/utils/provider.ts";
import UsuarioRepo, { UserRole } from "../lib/repositories/UsuarioRepo.ts";
import Usuario from "../lib/models/Usuario.ts";

export const handler = (_req: Request, ctx: FreshContext) => {
    const cookies = cookie.getCookies(_req.headers);
    if (!cookies["USER_ID"] || cookies["USER_ID"] === "") {
        return new Response(null, {
            status: 302,
            headers: {
                "Location": "/login",
            },
        });
    }

    return ctx.render();
};

export default async function Login(_req: Request, {}: PageProps) {
    const userRepo = Provider.get<UsuarioRepo>("repo:usuario");
    const cookies = cookie.getCookies(_req.headers);

    const haveUser = (!cookies["USER_ID"] || cookies["USER_ID"] === "")
        ? null
        : parseInt(cookies["USER_ID"]);
    let userRole: UserRole | null = null;
    let user: Usuario | null = null;

    if (haveUser !== null) {
        userRole = await userRepo.getRole(haveUser);
        user = await userRepo.readById(haveUser);
    }

    const quickActions: { name: string; icon: string }[] = [];
    if (userRole !== null) {
        if (userRole >= UserRole.ADMIN) {
            quickActions.push({
                name: "Reporte de ventas (Mensual)",
                icon: "📈",
            });
            quickActions.push({
                name: "Crear usuario",
                icon: "➕",
            });
            quickActions.push({
                name: "Ver usuarios",
                icon: "🔍",
            });
        }

        if (userRole >= UserRole.MESERO) {
            quickActions.push({
                name: "Ver recomendacion del dia",
                icon: "🍝",
            });
            quickActions.push({
                name: "Crear pedido",
                icon: "📜",
            });
        }

        if (userRole >= UserRole.BARISTA) {
            quickActions.push({
                name: "Ver lista de pedidos",
                icon: "📋",
            });
            quickActions.push({
                name: "Ver pedido en proceso",
                icon: "⏰",
            });
        }
    }

    return (
        <>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
                        <h2 className="text-2xl font-semibold mb-2">
                            Bienvenida, {!user
                                ? "Anonimo"
                                : `${user.nombres} ${user.apellidos}`}
                        </h2>
                        <p className="text-lg mb-4">
                            Rol (<b>{userRole}</b>): {(userRole != null)
                                ? {
                                    0: "Usuario",
                                    10: "Barista",
                                    20: "Mesero",
                                    100: "Administrador",
                                }[userRole]
                                : "Usuario"}
                        </p>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-3">
                                Acciones Rápidas
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {quickActions.map((action) => (
                                    <button
                                        key={action.name}
                                        className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200 rounded-lg p-3 flex flex-col items-center justify-center"
                                    >
                                        <span className="text-2xl mb-2">
                                            {action.icon}
                                        </span>
                                        <span className="text-sm text-center">
                                            {action.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
