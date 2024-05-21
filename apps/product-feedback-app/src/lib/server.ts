import db from '@/lib/db';
export async function getFeedback(id: string) {
    const feedback = await db.feedback.findUnique({
        where: { id },
        include: {
            tags: true
        }
    })
    return feedback;
}

export async function getFeedbackWithoutTags(id: string) {
    const feedback = await db.feedback.findUnique({
        where: { id }
    })
    return feedback;
}