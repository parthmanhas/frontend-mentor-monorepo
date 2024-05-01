import db from "@/db/db";
import { z } from "zod";

const PATCH_SCHEMA = z.object({
    feedbackId: z.string(),
    tagId: z.string(),
    comment: z.object({
        parentId: z.string(),
        feedbackId: z.string(),
        data: z.string(),
        userId: z.string()
    }),
    user: z.object({
        email: z.string()
    })
})

export async function PATCH(req: Request, res: Response) {
    const body = await req.json();
    const { feedbackId, tagId, comment, user } = body;

    try {
        const res = await db.feedback.update({
            where: { id: feedbackId },
            ...tagId || comment && {
                data: {
                    ...tagId && {
                        tags: {
                            connect: { id: tagId },
                        }
                    },
                    ...comment && {
                        comments: {
                            create: comment
                        }
                    }
                }
            },
            include: {
                comments: true,
                _count: {
                    select: { comments: true }
                }
            }
        })
        return new Response(JSON.stringify(res), { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const feedbackId = searchParams.get('id');
    const includeTags = searchParams.get('tags');
    const includeCommentCount = searchParams.get('commentCount');
    const includeAllComments = searchParams.get('allComments');
    const parentCommentsOnly = searchParams.get('parentComments');
    if (!feedbackId) {
        return new Response(JSON.stringify({ message: 'No feedback id passed' }), { status: 500 });
    }

    const feedback = await db.feedback.findUnique({
        where: { id: feedbackId },
        include: {
            ...includeCommentCount && {
                _count: {
                    select: { comments: true },
                },
            },
            ...includeTags && { tags: true },
            ...includeAllComments && {
                comments: true
            },
            ...parentCommentsOnly && {
                comments: {
                    where: { parentId: null }
                }
            }
        }
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