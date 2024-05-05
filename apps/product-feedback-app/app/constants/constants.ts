import { User } from '@prisma/client';
export interface ISortOption {
    id: string,
    name: string
}

export interface IPostCommentPatchRequest {
    feedbackId: string,
    comment: {
        parentId: string,
        data: string
    }
    user: Partial<User>
}

export const SORT_TYPES = {
    MOST_UPVOTES: 'most_upvotes',
    LEAST_UPVOTES: 'least_upvotes',
    MOST_COMMENTS: 'most_comments',
    LEAST_COMMENTS: 'least_comments',
}

export const SORT_OPTION: ISortOption[] = [
    { id: SORT_TYPES.MOST_UPVOTES, name: "Most Upvotes" },
    { id: SORT_TYPES.LEAST_UPVOTES, name: "Least Upvotes" },
    { id: SORT_TYPES.MOST_COMMENTS, name: "Most Comments" },
    { id: SORT_TYPES.LEAST_COMMENTS, name: "Least Comments" },
]

