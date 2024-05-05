'use client';

import AddComment from "@/app/components/AddComment";
import Button from "@/app/components/Button";
import Comments from "@/app/components/Comments";
import SuggestionsCard from "@/app/components/SuggestionsCard";
import { fetcher } from "@/app/utils/utils";
import { Feedback } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import useSWR from "swr";
import { Comment as IComment } from '@prisma/client';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const feedbackId = searchParams.get('id');
    const { data, isLoading, error, mutate } = useSWR(`/api/feedback?id=${feedbackId}&replies=true&commentCount=true&parentComments=true`, fetcher);
    const feedback: Feedback & { _count: { comments: number }, comments: IComment[] } = data;
    // const updateFeedback = (updatedFeedback: Feedback & { _count: number }) => {
    //     setFeedback(updatedFeedback);
    // }

    // revalidate when a comment is posted

    if (isLoading || !feedback) {
        return <ViewFeedbackLoadingSkeleton />
    }

    return <div className="mx-auto p-4 md:p-0 md:w-3/4 xlw-1/2 mt-3">
        <div className="flex justify-between mb-4 w-full">
            <Button variant="none">
                <div className="flex items-center" onClick={() => router.back()}>
                    <FaChevronLeft color="blue" className="mr-2" />
                    <p className="text-waikawa-gray-700 font-semibold">Go Back</p>
                </div>
            </Button>
            <Button onClick={() => router.push(`/feedback/edit?id=${searchParams.get('id')}`)} variant="blue">Edit Feedback</Button>
        </div>
        {feedback && <SuggestionsCard data={feedback satisfies Feedback} commentsCount={feedback._count.comments} />}
        <div className="text-east-bay-900 bg-white rounded mt-4 p-4">
            <h2>{feedback._count.comments} Comments</h2>
            <Comments comments={feedback.comments} />
        </div>
        {/* hardcoded */}
        {feedbackId && <AddComment feedback={feedback} email="parthmanhas@gmail.com" username="parthmanhas" mutate={mutate} feedbackId={feedbackId} />}
    </div>
}

function ViewFeedbackLoadingSkeleton() {
    return <div className="m-auto p-4 md:p-0 md:w-3/4 xlw-1/2 mt-3 bg-gray-200 rounded-xl animate-pulse">
        <div className="h-20 m-3 bg-gray-300 rounded-xl"></div>
        <div className="h-16 m-3 bg-gray-300 rounded-xl"></div>
        <div className="h-16 m-3 bg-gray-300 rounded-xl"></div>
        <div className="h-16 m-3 bg-gray-300 rounded-xl"></div>
        <div className="h-16 m-3 bg-gray-300 rounded-xl"></div>
        <div className="h-16 m-3 bg-gray-300 rounded-xl"></div>
        <div className="h-16 m-3 bg-gray-300 rounded-xl"></div>
        <div className="h-16 m-3 bg-gray-300 rounded-xl"></div>
    </div>
}