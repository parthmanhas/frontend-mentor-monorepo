import db from "@/db/db";

export async function POST(req: Request, res: Response) {
    const comment = await req.json();

    try {
        await db.comment.create({
            data: {
                ...comment
            }
        })
        return new Response("Sucess", { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}