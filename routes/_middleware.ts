import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { middlewareCookie } from "$sour/mod.ts";

const store = new Memory();

export const handler = [
    (request: Request, context: MiddlewareHandlerContext) => middlewareCookie(request, context),
];
