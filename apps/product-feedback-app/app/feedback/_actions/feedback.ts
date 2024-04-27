'use server';

import db from "@/db/db";
import { z } from "zod";

const addFeedbackSchema = z.object({
    title: z.string(),
    categoryId: z.string(),
    feedback: z.string()
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