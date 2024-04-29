import SuggestionsCard from '@/app/components/SuggestionsCard';
import useSWR from 'swr';
import { fetcher } from '../utils/utils';
import { Feedback, Tag } from '@prisma/client';
import { ISortOption } from '../constants/constants';

type GetFeedbacks = ({
    _count: {
        comments: number;
    },
    tags: Tag[]
} & Feedback)[];

type GetFeedback = {
    _count: {
        comments: number;
    },
    tags: Tag[]
} & Feedback;

export default function FeedbackContainer({ sortOption }: { sortOption: ISortOption }) {
    const { data, isLoading, error } = useSWR(`/api/feedbacks?sort=${sortOption.queryParam}`, fetcher);
    const feedbacks = data as GetFeedbacks;
    return <>
        {isLoading ? <SuggestionsCardSkeleton /> : feedbacks.map((feedback: GetFeedback, index: number) => <SuggestionsCard key={index} data={feedback} className="m-5 md:m-0 md:mt-3" />)}
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