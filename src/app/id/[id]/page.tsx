import auth from "@/auth";
import AddComment from "@/components/add-comment";
import Comments from "@/components/comments";
import PageContent from "@/components/page-content";
import SuggestionCard from "@/components/suggestion-card";
import { Button } from "@/components/ui/button";
import { getComments, getFeedbackWithComments } from "@/lib/server";
import { Comment } from "@prisma/client";
import Link from "next/link";

type FeedbackPageProps = {
    params: {
        id: string
    }
}

export default async function FeedbackPage({ params }: FeedbackPageProps) {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
        console.error('Session or user or email not present');
        // send to login page
        return;
    }
    const id = params.id;
    if (!id) {
        throw new Error('Feedback id not present in url!');
    }

    const groupComments = (comments: Comment[], parentId: string | null = null) => {
        const result: (Comment & { children: Comment[] })[] = [];

        for (const comment of comments) {
            if (comment.parentCommentId === parentId) {
                const children = groupComments(comments, comment.id);
                result.push({ ...comment, children });
            }
        }

        return result;
    }

    type CommentWithChildren = Comment & { children: CommentWithChildren[] }
    const getTotalComments = (comments: CommentWithChildren[]) => {
        if (!comments || comments.length == 0) return 0;
        let totalComments = comments.length;
        for (const comment of comments) {
            totalComments += getTotalComments(comment.children);
        }
        return totalComments;
    }
    const feedbackResponse = await getFeedbackWithComments(id);
    let comments = await getComments(id) || [];
    const totalComments = comments.length;
    if (!comments) {
        console.error('Error loading comments');
    }
    comments = groupComments(comments);
    const feedback = { ...feedbackResponse, totalComments, comments };

    if (!feedback) {
        console.error('No feedback with present');
        return;
    }
    return (
        <PageContent className="p-5">
            <div className="w-full flex justify-between mb-5">
                <Link href="/home">
                    <Button>Go back</Button>
                </Link>
                <Link href={`/edit/${id}`}>
                    <Button>Edit Feedback</Button>
                </Link>
            </div>
            <SuggestionCard feedback={{ ...feedback, tags: [] }} />
            <Comments totalComments={feedback.totalComments} parentFeedbackId={feedback.id} comments={feedback.comments} />
            <AddComment feedbackId={feedback.id} className="mt-auto" />
        </PageContent>
    )
}