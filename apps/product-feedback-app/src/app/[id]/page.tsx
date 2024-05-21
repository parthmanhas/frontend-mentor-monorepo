import AddComment from "@/components/add-comment";
import Comments from "@/components/comments";
import SuggestionCard from "@/components/suggestion-card";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import Link from "next/link";

async function getFeedback(id: string) {
    const feedback = await db.feedback.findUnique({
        where: { id },
        include: {
            tags: true
        }
    })
    return feedback;
}

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
        <div className="flex flex-col max-w-[1280px] mx-auto h-screen py-5">
            <div className="w-full flex justify-between mb-5">
                <Link href="/">
                    <Button>Go back</Button>
                </Link>
                <Button>Edit Feedback</Button>
            </div>
            <SuggestionCard feedback={feedback} />
            <Comments />
            <AddComment className="mt-auto" />
        </div>
    )
}