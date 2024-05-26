import { Comment, Feedback, Tag } from '@prisma/client';

export type FeedbackWithTagsAndCommentsCountResponse = Feedback & { tags: Tag[] } & { _count: { comments: number } } & { comments: { _count: { children: number } }[] };

export type FeedbackWithTagsAndCommentsCount = Feedback & { tags: Tag[] } & { totalComments: number };

export type FeedbackWithComments = Feedback & { comments: Comment[] };