import db from "@/db/db";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const parentId = searchParams.get('parentId');

    if (!parentId) {
        throw new Error("parentId is missing");
    }

    try {
        const comments = await db.comment.findMany({
            where: { parentId }
        })
        return new Response(JSON.stringify(comments), { status: 200 });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}