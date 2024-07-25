import { db, eq, Visitor } from 'astro:db';
import type { APIContext } from 'astro';
const hashIP = async (str:string) => {
    const textAsBuffer = new TextEncoder().encode(str);
    const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer), item => item.toString(16).padStart(2, '0'));

    return hashArray.join('');
}

export async function GET({ clientAddress }: APIContext) {
    const hash = await hashIP(clientAddress);
    const hasVisited = await db.select().from(Visitor).where(eq(Visitor.hash, hash));
    
    return new Response(JSON.stringify({ hasVisited: hasVisited.length > 0, hash }));
}