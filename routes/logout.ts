import type { HandlerContext } from "$fresh/server.ts";
import * as cookie from "https://deno.land/std@0.224.0/http/cookie.ts";

export const handler = (_req: Request, _ctx: HandlerContext) => {
    const response = new Response(null, {
        status: 302,
        headers: {
            'Location': '/',
        }
    });

    cookie.deleteCookie(response.headers, 'USER_ID');

    return response;
  };
  