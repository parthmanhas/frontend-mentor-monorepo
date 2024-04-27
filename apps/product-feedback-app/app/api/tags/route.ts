import db from '@/db/db';

export async function GET(req: Request) {
    try {
        const tags = await db.tag.findMany();
        return new Response(JSON.stringify({ success: true, tags }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}