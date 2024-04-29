'use client';

import AddComment from "@/app/components/AddComment";
import Button from "@/app/components/Button";
import Comments from "@/app/components/Comments";
import SuggestionsCard from "@/app/components/SuggestionsCard";
import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const feedbackId = searchParams.get('id');
    return <div className="mx-auto p-4 md:p-0 md:w-3/4 xlw-1/2 mt-3">
        <div className="flex justify-between mb-4 w-full">
            <Button variant="none">
                <div className="flex items-center">
                    <FaChevronLeft color="blue" className="mr-2" />
                    <p className="text-waikawa-gray-700 font-semibold">Go Back</p>
                </div>
            </Button>
            <Button onClick={() => router.push(`/feedback/edit?id=${searchParams.get('id')}`)} variant="blue">Edit Feedback</Button>
        </div>
        <SuggestionsCard  />
        <Comments />
        <AddComment />
    </div>
}