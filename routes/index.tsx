import type { PageProps, HandlerContext } from "$fresh/server.ts";
import * as cookie from "https://deno.land/std@0.224.0/http/cookie.ts";

export const handler = (_req: Request, ctx: HandlerContext) => {
  const cookies = cookie.getCookies(_req.headers);
  if (!cookies['USER_ID'] || cookies['USER_ID'] === '') {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/login',
      }
    })
  }

  return ctx.render();
};

export default function Login({}: PageProps) {
  return (
    <>
      <h1 className="align-center">Hello Home</h1>
    </>
  );
}