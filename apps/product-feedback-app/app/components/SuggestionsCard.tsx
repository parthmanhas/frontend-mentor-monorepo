'use client';

import { Feedback, Tag } from "@prisma/client";
import CommentsNumber from "./CommentsNumber";
import TagComponent from "./Tag";
import Upvote from "./Upvote";
import Link from "next/link";
import { useState } from "react";

export default function SuggestionsCard({ className, data, commentsCount, tags }: {
    className?: string,
    data: Feedback,
    commentsCount: number,
    tags?: Tag[]
}) {
    const [feedbackData, setFeedbackData] = useState(data);
    const [loading, setLoading] = useState(false);

    const handleDrop = async (e) => {
        e.preventDefault();
        const draggedTag = JSON.parse(e.dataTransfer.getData('text/json')) as Tag;
        if (tags.some(tag => tag.id === draggedTag.id)) {
            console.info('Tag already exists');
            return;
        }
        setLoading(true);
        const response = await fetch('/api/feedback', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tagId: draggedTag.id, feedbackId: feedbackData.id })
        })
        setLoading(false);

        if (!response.ok) {
            console.error('Error updating feedback with tagId');
        }

        updateFeedbackOnChange();
    };

    const updateFeedbackOnChange = async () => {
        setLoading(true);
        const updatedFeedbackResponse = await fetch(`/api/feedback?id=${data.id}&tags=true&commentsCount=true`);
        const updatedFeedback = await updatedFeedbackResponse.json();
        setLoading(false);
        if (updatedFeedback == null) {
            console.error('Feedback updated, but failed to fetch updated feedback');
            return;
        }

        setFeedbackData(updatedFeedback);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleTagDelete = async (e: React.MouseEvent<HTMLSpanElement>, id: string) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch('/api/tags', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ feedbackId: data.id, tagId: id })
            })
            updateFeedbackOnChange();
        } catch (error) {
            console.error(`Failed to delete tag with id: ${id}`);
            setLoading(false);
        }
    }


    if (loading) return <LoadingSkeletonSuggestionsCard />

    return <Link href={`/feedback/view?id=${feedbackData?.id}`}>
        <div onDrop={handleDrop} onDragOver={handleDragOver} className={`${className} bg-white grid grid-cols-10 rounded-lg p-5 md:gap-8 hover:cursor-pointer relative`}>
            <div className="col-span-1 hidden md:block">
                <Upvote feedbackId={feedbackData?.id} initialVotes={feedbackData?.votes} />
            </div>
            <div className="col-span-10 md:col-span-8 flex flex-col flex-shrink-0" onClick={() => console.log('div clicked')}>
                <h3 className="text-east-bay-900 mb-1">{feedbackData?.title}</h3>
                <p className="text-waikawa-gray-700 mb-2">{feedbackData?.feedback}</p>
                {tags && <div className="flex flex-wrap">
                    {tags.map((tag, index) => <TagComponent handleDelete={handleTagDelete} id={tag.id} name={tag.name} key={index} />)}
                </div>}
                <div className="flex justify-between grow-1 md:hidden">
                    <Upvote feedbackId={feedbackData?.id} initialVotes={feedbackData?.votes} />
                    <CommentsNumber count={commentsCount} />
                </div>
            </div>
            <div className="col-span-1 hidden md:flex">
                <CommentsNumber count={commentsCount} />
            </div>
        </div>
    </Link>
}

function LoadingSkeletonSuggestionsCard({ className }: { className?: string }) {
    return <div className={`${className} bg-white grid grid-cols-10 rounded-lg p-5 md:gap-8 hover:cursor-pointer`}>
        <div className="col-span-1 hidden md:block">
            <div className="bg-gray-200 animate-pulse w-12 h-12"></div>
        </div>
        <div className="col-span-10 md:col-span-8 flex flex-col flex-shrink-0">
            <div className="bg-gray-200 animate-pulse w-48 h-4 mb-2"></div>
            <div className="bg-gray-200 animate-pulse w-full h-12 mb-2"></div>
            <div className="flex flex-wrap">
                <div className="bg-gray-200 animate-pulse w-16 h-4 mr-2"></div>
                <div className="bg-gray-200 animate-pulse w-16 h-4 mr-2"></div>
                <div className="bg-gray-200 animate-pulse w-16 h-4 mr-2"></div>
            </div>
            <div className="flex justify-between grow-1 md:hidden">
                <div className="bg-gray-200 animate-pulse w-12 h-12"></div>
                <div className="bg-gray-200 animate-pulse w-8 h-4"></div>
            </div>
        </div>
        <div className="col-span-1 hidden md:flex">
            <div className="bg-gray-200 animate-pulse w-8 h-4"></div>
        </div>
    </div>
}