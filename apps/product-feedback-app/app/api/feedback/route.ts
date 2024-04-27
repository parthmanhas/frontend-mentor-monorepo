import db from "@/db/db";
import { NextRequest } from "next/server";

export async function PATCH(req: Request, res: Response) {
    // const body = await req.json();
    // const { feedbackId, tagId } = body;
    // db.feedback.update({
    //     where: { id: feedbackId},

    // })
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const feedbackId = searchParams.get('id');

    if (!feedbackId) {
        return new Response(JSON.stringify({ message: 'No feedback id passed' }), { status: 500 });
    }

    const feedback = await db.feedback.findUnique({
        where: { id: feedbackId }
    })

    if (!feedback) {
        return new Response(JSON.stringify({ message: `No feedback found with id: ${feedbackId}` }), { status: 500 });
    }

    return new Response(JSON.stringify({ ...feedback }), { status: 200 });
}

export async function DELETE(req: Request) {
    try {
        const { feedbackId } = await req.json();

        await db.feedback.delete({
            where: { id: feedbackId }
        })
        return new Response("Successfully deleted", { status: 200 });
    } catch (error) {
        console.error(error)
        return new Response("Internal server error", { status: 500 });
    }

}