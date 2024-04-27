'use server';

import db from "@/db/db";
import { z } from "zod";

const addFeedbackSchema = z.object({
    title: z.string(),
    categoryId: z.string(),
    feedback: z.string()
})


const updateFeedbackSchema = z.object({
    feedbackId: z.string(),
    title: z.string(),
    categoryId: z.string(),
    feedback: z.string(),
    status: z.string()
})

export async function addFeedback(formData: FormData) {
    const parsed = addFeedbackSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!parsed.success) {
        console.error('Error parsing formData', JSON.stringify(parsed.error));
        return { success: false };
    }

    const { title, categoryId, feedback } = parsed.data;

    await db.feedback.create({
        data: {
            title,
            categoryId,
            feedback,
            votes: 0,
            status: 'PLANNED'

        }
    })

    return { success: true }
}

export async function updateFeedback(formData: FormData) {
    const parsed = updateFeedbackSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!parsed.success) {
        console.error(`Error parsing the body: ${JSON.stringify(parsed.error)}`);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }

    const { data } = parsed;

    await db.feedback.update({
        where: { id: data.feedbackId },
        data: {
            title: data.title,
            categoryId: data.categoryId,
            feedback: data.feedback
        }
    });

    return { success: true };
}