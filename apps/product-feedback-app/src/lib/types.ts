import { Feedback, Tag } from '@prisma/client';

export type FeedbackWithTags = Feedback & { tags: Tag[] };