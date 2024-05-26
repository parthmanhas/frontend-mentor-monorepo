import AddComment from "@/components/add-comment";
import Comments from "@/components/comments";
import PageContent from "@/components/page-content";
import SuggestionCard from "@/components/suggestion-card";
import { Button } from "@/components/ui/button";
import { getFeedbackWithComments } from "@/lib/server";
import Link from "next/link";

type FeedbackPageProps = {
    params: {
        id: string
    }
}

export default async function FeedbackPage({ params }: FeedbackPageProps) {
    const id = params.id;
    if (!id) {
        throw new Error('Feedback id not present in url!');
    }

    const getTotalComments = (comments) => {
        if (!comments || comments.length == 0) return 0;
        let totalComments = comments.length;
        for (const comment of comments) {
            totalComments += getTotalComments(comment.children);
        }
        return totalComments;
    }
    const feedbackResponse = await getFeedbackWithComments(id);
    const feedback = { ...feedbackResponse, totalComments: getTotalComments(feedbackResponse.comments) };

    if (!feedback) {
        console.error('No feedback with present');
        return;
    }
    return (
        <PageContent className="py-5">
            <div className="w-full flex justify-between mb-5">
                <Link href="/home">
                    <Button>Go back</Button>
                </Link>
                <Link href={`/edit/${id}`}>
                    <Button>Edit Feedback</Button>
                </Link>
            </div>
            <SuggestionCard feedback={{ ...feedback, tags: [] }} />
            <Comments comments={feedback.comments} />
            {/* TODO: change the userEmail to global variable, do this when implementing authentication */}
            <AddComment userEmail="getUserNameFromContext@goog.com" feedbackId={feedback.id} className="mt-auto" />
        </PageContent>
    )
}