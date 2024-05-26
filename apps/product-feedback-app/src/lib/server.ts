"use server";

import db from '@/lib/db';
import { Status } from '@prisma/client';
import { z } from 'zod';
import { USER_EMAIL } from '@/lib/constants';
import { FeedbackWithTags } from '@/lib/types';
import { revalidatePath } from 'next/cache';

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

export async function getAllTags() {
    const tags = await db.tag.findMany();
    return tags;
}

export async function getFeedbacks(filterTags: string[] | null, sortOption: { sort: string, order: 'asc' | 'desc' } | null) {

    if (!filterTags || filterTags.length === 0) {
        const result = await db.feedback.findMany({
            where: {
                userEmail: USER_EMAIL
            },
            include: {
                tags: true
            },
            ...(sortOption && {
                orderBy: {
                    [sortOption.sort]: sortOption.order
                }
            })
        })
        return result as FeedbackWithTags[];
    }

    const result = await db.feedback.findMany({
        where: {
            tags: {
                some: {
                    name: {
                        in: filterTags
                    }
                }
            }
        },
        include: {
            tags: true
        },
        ...(sortOption && {
            orderBy: {
                [sortOption.sort]: sortOption.order
            }
        })
    })
    return result as FeedbackWithTags[];
}

export async function getAllCategory() {
    const result = await db.category.findMany();
    return result;
}

export async function updateFeedback(form: FormData) {
    const formData = Object.fromEntries(form);

    const updateFeedbackSchema = z.object({
        feedbackId: z.string(),
        heading: z.string(),
        content: z.string(),
        categoryName: z.string(),
        status: z.enum([Status.INPROGRESS, Status.LIVE, Status.PLANNED]),
        userEmail: z.string().email()
    })

    const parsed = updateFeedbackSchema.safeParse(formData);

    if (!parsed.success) {
        console.error(parsed.error);
        return;
    }

    const { heading, content, categoryName, status, userEmail, feedbackId } = parsed.data;

    try {
        await db.feedback.update({
            where: { id: feedbackId },
            data: {
                content,
                heading,
                upvotes: 0,
                categoryName,
                status,
                userEmail
            }
        });
        revalidatePath(`/edit/${feedbackId}`);
        return {
            success: true,
            message: 'Feedback Updated!'
        }
    } catch (e) {
        console.error(`Error updating feedback`, e);
        return {
            success: false,
            message: 'Error updating feedback'
        }
    }
}