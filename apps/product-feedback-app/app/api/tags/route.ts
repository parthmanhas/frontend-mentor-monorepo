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

export async function DELETE(req: Request, res: Response) {
    try {
        const { feedbackId, tagId } = await req.json();
        await db.feedback.update({
            where: { id: feedbackId },
            data: {
                tags: {
                    disconnect: { id: tagId }
                }
            }
        })

        return new Response("Tag removed successfully", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}