import SuggestionsCard from '@/app/components/SuggestionsCard';
import useSWR from 'swr';
import { fetcher } from '../utils/utils';
import { Feedback, Tag } from '@prisma/client';
import { ISortOption, SORT_OPTION, SORT_TYPES } from '../constants/constants';

type SortedFeedbacks = ({
    _count: {
        comments: number;
    },
    tags: Tag[]
} & Feedback)[];

type SortFeedback = {
    _count: {
        comments: number;
    },
    tags: Tag[]
} & Feedback;

export default function FeedbackContainer({ sortOption }: { sortOption: ISortOption }) {
    const { data, isLoading, error } = useSWR(`/api/feedbacks?sort=${sortOption.id}`, fetcher);
    let feedbacks = data as SortedFeedbacks;

    if (sortOption.id === SORT_TYPES.MOST_COMMENTS) {
        feedbacks = feedbacks.sort((a, b) => b._count.comments - a._count.comments);
    } else if (sortOption.id === SORT_TYPES.LEAST_COMMENTS) {
        feedbacks = feedbacks.sort((a, b) => a._count.comments - b._count.comments);
    }


    return <>
        {isLoading ?
            <SuggestionsCardSkeleton /> :
            feedbacks.map(
                (feedback: SortFeedback, index: number) =>
                    <SuggestionsCard key={index}
                        data={feedback}
                        commentsCount={feedback._count.comments}
                        tags={feedback.tags}
                        className="m-5 md:m-0 md:mt-3"
                    />)}
    </>
}

function SuggestionsCardSkeleton() {
    return (
        <div className="m-5 md:m-0 md:mt-3 animate-pulse">
            <div className="bg-gray-300 rounded w-full h-20 mb-4"></div>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-300 rounded w-full h-10"></div>
                <div className="bg-gray-300 rounded w-full h-10"></div>
                <div className="bg-gray-300 rounded w-full h-10"></div>
            </div>
        </div>
    );
}