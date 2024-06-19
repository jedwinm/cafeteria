import { crypto } from "https://deno.land/std@0.224.0/crypto/mod.ts";
import { bufferToHex } from "https://deno.land/x/hextools@v1.0.0/mod.ts";

export async function hashContrasena(contrasena: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(contrasena);
    const result = await crypto.subtle.digest('SHA-512', data);
    return bufferToHex(result)
}