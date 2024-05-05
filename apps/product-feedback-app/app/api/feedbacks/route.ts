import db from "@/db/db";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sortOption = searchParams.get('sort');
    try {
        const feedbacks = await db.feedback.findMany({
            include: {
                _count: {
                    select: {
                        comments: true
                    }
                },
                tags: true
            },
            ...(sortOption === 'most_upvotes' && {
                orderBy: {
                    votes: 'desc',
                }
            }),
            ...(sortOption === 'least_upvotes' && {
                orderBy: {
                    votes: 'asc'
                }
            }),
        });
        return new Response(JSON.stringify([...feedbacks]), { status: 200 });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}