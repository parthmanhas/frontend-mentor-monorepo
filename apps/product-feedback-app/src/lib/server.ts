"use server";

import db from '@/lib/db';
import { Status } from '@prisma/client';
import { z } from 'zod';
import { USER_EMAIL } from '@/lib/constants';

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

export async function createFeedback(form: FormData) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const formData = Object.fromEntries(form);
    // default status will always be PLANNED
    formData.status = "PLANNED";
    formData.userEmail = USER_EMAIL;

    const createFeedbackSchema = z.object({
        heading: z.string(),
        content: z.string(),
        categoryName: z.string(),
        status: z.enum([Status.INPROGRESS, Status.LIVE, Status.PLANNED]),
        userEmail: z.string().email()
    })

    const parsed = createFeedbackSchema.safeParse(formData);

    if (!parsed.success) {
        console.error(parsed.error);
        return;
    }

    const { heading, content, categoryName, status, userEmail } = parsed.data;

    try {
        await db.feedback.create({
            data: {
                content,
                heading,
                upvotes: 0,
                categoryName,
                status,
                userEmail
            }
        });
        return {
            success: true,
            message: 'Feedback Created!'
        }
    } catch (e) {
        console.error(`Error creating a feedback`, e);
        return {
            success: false,
            message: 'Error creating feedback'
        }
    }
}