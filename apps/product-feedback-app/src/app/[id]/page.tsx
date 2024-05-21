import AddComment from "@/components/add-comment";
import Comments from "@/components/comments";
import PageContent from "@/components/page-content";
import SuggestionCard from "@/components/suggestion-card";
import { Button } from "@/components/ui/button";
import { getFeedback } from "@/lib/server";
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
    const feedback = await getFeedback(id);
    if (!feedback) {
        console.error('No feedback with present');
        return;
    }
    return (
        <PageContent className="py-5">
            <div className="w-full flex justify-between mb-5">
                <Link href="/">
                    <Button>Go back</Button>
                </Link>
                <Link href={`/edit/${id}`}>
                    <Button>Edit Feedback</Button>
                </Link>
            </div>
            <SuggestionCard feedback={feedback} />
            <Comments />
            <AddComment className="mt-auto" />
        </PageContent>
    )
}