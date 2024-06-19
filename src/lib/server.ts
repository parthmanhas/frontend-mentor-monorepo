"use server";

import db from '@/lib/db';
import { Status, User } from '@prisma/client';
import { z } from 'zod';
import { FeedbackWithComments, FeedbackWithTagsAndCommentsCountResponse } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { loginInSchema, registerSchema } from '@/lib/schema';
import auth, { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { FEEDBACK_PER_PAGE } from './constants';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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

export async function getFeedbacks(
    currentPage: number,
    type: 'all' | 'my' | null,
    filterTags: string[] | null,
    sortOption: { sort: string, order: 'asc' | 'desc' } | null) {

    if (type == null) {
        return [];
    }

    const session = await auth();
    if (!session) {
        throw new Error('Session not found');
    }

    if (!session.user) {
        throw new Error('User object not found');
    }

    if (!session.user.email) {
        throw new Error('User email not found');
    }

    const userEmail = session.user.email;

    if (!filterTags || filterTags.length === 0) {
        const result = await db.feedback.findMany({
            ...(type === 'my' && {
                where: {
                    userEmail
                }
            }),
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
            }),
            skip: (currentPage - 1 < 0 ? 0 : currentPage - 1) * FEEDBACK_PER_PAGE,
            take: FEEDBACK_PER_PAGE
        })
        revalidatePath('/home');
        return result as FeedbackWithTagsAndCommentsCountResponse[];
    }

    // with filter tags
    const result = await db.feedback.findMany({
        where: {
            ...(type === 'my' && { userEmail }),
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
        }),
        skip: (currentPage - 1 < 0 ? 0 : currentPage - 1) * FEEDBACK_PER_PAGE,
        take: FEEDBACK_PER_PAGE
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
        revalidatePath('/home');
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

    try {
        const session = await auth();
        const loggedInUserEmail = session?.user?.email;

        if (loggedInUserEmail) {
            form.append('userEmail', loggedInUserEmail);
        } else {
            console.error('No user is logged in.');
            return {
                success: false,
                message: 'Error adding comment'
            }
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        return {
            success: false,
            message: 'Error adding comment'
        }
    }

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
    formData.append('redirectTo', '/home?feedbacks=my')
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

export async function register(
    prevState: any | undefined,
    formData: FormData,
) {
    try {
        const parsed = registerSchema.parse(Object.fromEntries(formData));

        const { email, password, name, username } = parsed;
        const count = await db.user.count({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            }
        });

        if (count >= 1) {
            return { success: false, message: 'Username or email already exists' };
        }

        const bcrypt = require('bcrypt');
        await db.user.create({
            data: {
                email,
                password: await bcrypt.hash(password, 10),
                name,
                username
            }
        });
        return { success: true, message: 'Account created successfully' }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { success: false, message: 'Invalid credentials.' };
                default:
                    return { success: false, message: 'Something went wrong.' };
            }
        }
        return { success: false, message: 'Something went wrong.' };
    }
}

export async function getRoadmap() {
    try {
        const session = await auth();
        if (!session) {
            throw new Error('Session not found');
        }

        if (!session.user) {
            throw new Error('User object not found');
        }

        if (!session.user.email) {
            throw new Error('User email not found');
        }
        const loggedInUserEmail = session.user.email;
        const roadmap = await db.feedback.groupBy({
            by: ['status'],
            _count: {
                status: true
            },
            where: {
                userEmail: loggedInUserEmail,
                status: {
                    in: ['INPROGRESS', 'LIVE', 'PLANNED']
                }
            }
        });
        return roadmap;
    } catch (e) {
        console.error('Could not find user email');
    }


}
export async function getAllTotalFeedbacksCount() {
    try {
        const count = await db.feedback.count();
        return count;
    } catch (e) {
        console.error('Error getting all feedbacks count');
        return 0;
    }
}

export async function getMyTotalFeedbacksCount() {

    try {
        const session = await auth();
        if (!session) {
            throw new Error('Session not found');
        }

        if (!session.user) {
            throw new Error('User object not found');
        }

        if (!session.user.email) {
            throw new Error('User email not found');
        }
        const count = await db.feedback.count({
            where: {
                userEmail: session.user.email
            }
        });
        return count;
    } catch (e) {
        console.error('Error getting my feedbacks count');
        return 0;
    }
}