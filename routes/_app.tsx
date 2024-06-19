import { type PageProps } from "$fresh/server.ts";
import Header from "../components/layout/Header.tsx";

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
