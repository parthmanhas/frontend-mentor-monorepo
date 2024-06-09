"use server";

import db from '@/lib/db';
import { Status, User } from '@prisma/client';
import { z } from 'zod';
import { FeedbackWithComments, FeedbackWithTagsAndCommentsCountResponse } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { loginInSchema } from '@/lib/schema';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function getFeedbackWithComments(id: string) {
    const feedback = await db.feedback.findUnique({
        where: { id },
        include: {
            comments: {
                include: {
                    children: true,
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            },
        },
    })
    return feedback as FeedbackWithComments;
}

export async function getFeedbackWithoutTags(id: string) {
    const feedback = await db.feedback.findUnique({
        where: { id }
    })
    return feedback;
}

export async function createFeedback(form: FormData) {
    const formData = Object.fromEntries(form);

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

export async function getFeedbacks(userEmail: string, filterTags: string[] | null, sortOption: { sort: string, order: 'asc' | 'desc' } | null) {
    if (!userEmail) {
        console.error('userEmail not found');
        return;
    }
    if (!filterTags || filterTags.length === 0) {
        const result = await db.feedback.findMany({
            where: {
                userEmail
            },
            include: {
                tags: true,
                _count: {
                    select: {
                        comments: true
                    },
                },
                comments: {
                    select: {
                        _count: {
                            select: {
                                children: true
                            }
                        }
                    }
                }
            },
            ...((sortOption?.sort === 'upvotes') && {
                orderBy: {
                    [sortOption.sort]: sortOption.order
                }
            }),
            ...((sortOption?.sort === 'comments') && {
                orderBy: {
                    [sortOption.sort]: {
                        _count: sortOption.order
                    }
                }
            })
        })
        revalidatePath('/');
        return result as FeedbackWithTagsAndCommentsCountResponse[];
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
            tags: true,
            _count: {
                select: {
                    comments: true
                },
            },
            comments: {
                select: {
                    _count: {
                        select: {
                            children: true
                        }
                    }
                }
            }
        },
        ...((sortOption?.sort === 'upvotes') && {
            orderBy: {
                [sortOption.sort]: sortOption.order
            }
        }),
        ...((sortOption?.sort === 'comments') && {
            orderBy: {
                [sortOption.sort]: {
                    _count: sortOption.order
                }
            }
        })
    })
    return result as FeedbackWithTagsAndCommentsCountResponse[];
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

export async function updateUpvote(feedbackId: string) {
    if (!feedbackId) {
        console.error('feedbackId undefined');
    }
    try {
        const response = await db.feedback.update({
            where: { id: feedbackId },
            data: {
                upvotes: {
                    increment: 1
                }
            }
        })
        return response.upvotes;
    } catch (e) {
        console.error('Could not update feedback count', e);
    }
}

export async function getAllUser() {
    try {
        const result = await db.user.findMany();
        return result;
    } catch (e) {
        console.error('Error getting users');
    }
}

export async function postComment(form: FormData) {
    const postCommentSchema = z.object({
        feedbackId: z.string(),
        parentCommentId: z.string().optional(),
        content: z.string(),
        userEmail: z.string().email()
    })

    const parsed = postCommentSchema.safeParse(Object.fromEntries(form));

    if (!parsed.success) {
        console.error(parsed.error);
        return {
            success: false,
            message: 'Error adding comment'
        }
    }

    // if comment is a child of feedback, adding comment
    if (parsed.data.feedbackId && !parsed.data.parentCommentId) {
        const { feedbackId, content, userEmail } = parsed.data;
        try {
            await db.comment.create({
                data: {
                    content,
                    userEmail,
                    parentFeedbackId: feedbackId
                }
            })
            revalidatePath(`/${feedbackId}`);
            return {
                success: true,
                message: 'Added comment successfully'
            }
        } catch (e) {
            console.error(`Error postComment: ${e}`);
            return {
                success: false,
                message: 'Error adding comment'
            }
        }
    }

    // if comment is a child of another comment, posting reply
    if (parsed.data.parentCommentId) {
        const { feedbackId, parentCommentId, content, userEmail } = parsed.data;
        try {
            await db.comment.create({
                data: {
                    content,
                    userEmail,
                    parentCommentId,
                    parentFeedbackId: feedbackId
                }
            })
            revalidatePath(`/${feedbackId}`);
            return {
                success: true,
                message: 'Posted reply successfully'
            }
        } catch (e) {
            console.error(e);
            return {
                success: false,
                message: 'Error posting reply'
            }
        }
    }

    console.error('parentCommentId is missing');
    return {
        success: false,
        message: 'Error posting reply'
    }
}

export async function getComments(feedbackId: string) {
    try {
        const results = await db.comment.findMany({
            where: { parentFeedbackId: feedbackId },
            orderBy: {
                updatedAt: 'desc'
            }
        });
        return results;
    } catch (e) {
        console.error(`Error getting comments with feedback id : ${feedbackId}`, e);
    }
}

export async function getUser(credentials: { email: string, password: string }): Promise<User | null> {
    try {
        const parsed = loginInSchema.safeParse(credentials);

        if (!parsed.success) {
            console.error(parsed.error)
            return null;
        }

        const { email } = parsed.data;

        const user = await db.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            console.error('User not found');
            return null;
        }

        return user;

    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}