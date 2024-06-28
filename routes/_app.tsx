import { PageProps } from "$fresh/server.ts";
import Header from "../components/layout/Header.tsx";

import Provider from "../lib/utils/provider.ts";
import getDatabase from "../lib/utils/db.ts";
import UsuarioRepo, { UserRole } from "../lib/repositories/UsuarioRepo.ts";
import UsuarioAutenticableRepo from "../lib/repositories/UsuarioAutenticableRepo.ts";
import * as cookie from "https://deno.land/std@0.224.0/http/cookie.ts";

new Provider();
Provider.set("db", await getDatabase());
Provider.set("repo:usuario", new UsuarioRepo());
Provider.set("repo:usuarioAutenticable", new UsuarioAutenticableRepo());

interface AppData {
    userRole: UserRole | null;
    haveUser: boolean;
    userId: number | null;
}

export default async function App(_req: Request, {Component}: PageProps) {
    const userRepo = Provider.get<UsuarioRepo>("repo:usuario");
    const cookies = cookie.getCookies(_req.headers);

    const haveUser = (!cookies["USER_ID"] || cookies["USER_ID"] === "")
        ? null : parseInt(cookies["USER_ID"]);
    let userRole: UserRole | null = null;

    if (haveUser !== null) {
        userRole = await userRepo.getRole(haveUser);
    }

    return (
        <html>
            <head>
                {/* Metadatos */}
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />

                {/* OG */}
                {/* Pendiente */}

                <title>La Cafeteria - By Jhoncito</title>

                {/* CSS */}
                <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
                <Header haveUser={haveUser !== null} userRole={userRole} />
                <Component />
                {/* Footer */}
            </body>
        </html>
    );
}
