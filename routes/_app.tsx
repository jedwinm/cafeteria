import { type PageProps } from "$fresh/server.ts";
import Header from "../components/layout/Header.tsx";


import Provider from "../lib/utils/provider.ts";
import getDatabase from "../lib/utils/db.ts";
import UsuarioRepo from "../lib/repositories/UsuarioRepo.ts";

new Provider();
Provider.set('db', await getDatabase());
Provider.set('repo:usuario', new UsuarioRepo());

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        {/* Metadatos */}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* OG */}
        {/* Pendiente */}

        <title>La Cafeteria - By Jhoncito</title>

        {/* CSS */}
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Header />
        <Component />
        {/* Footer */}
      </body>
    </html>
  );
}
