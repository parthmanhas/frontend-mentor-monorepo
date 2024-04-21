import db from "@/db/db";
import { z } from "zod";

const voteSchema = z.object({
    feedbackId: z.string(),
    count: z.number()
})

export async function POST(req: Request, res: Response) {
    const body = await req.json();
    const parsed = voteSchema.safeParse(body);

    if (!parsed.success) {
        console.log(`Error parsing the body: ${parsed.error}`);
        return new Response(JSON.stringify({ success: false, error: 'Invalid Body' }), { status: 400 });
    }

    const { feedbackId, count } = parsed.data;
    console.log({ feedbackId, count });
    try {
        await db.feedback.update({
            where: { id: feedbackId },
            data: { votes: { increment: count } }
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}


export async function GET(req: Request) {
    const feedbackId = req.url?.split('?')[1];
    try {
        const feedback = await db.feedback.findUnique({
            where: { id: feedbackId },
            select: { votes: true }
        })

        if (!feedback) {
            return new Response(JSON.stringify({ success: false, error: 'Feedback not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, votes: feedback.votes }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}