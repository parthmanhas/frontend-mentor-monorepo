import db from "@/db/db";

export async function GET(req: Request) {
    try {
        const categories = await db.category.findMany();
        return new Response(JSON.stringify({ success: true, categories }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}