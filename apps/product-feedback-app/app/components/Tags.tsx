import Tag from "./Tag";
import {fetcher} from '@/app/utils/utils';
import useSWR from 'swr';

export default function Tags({ className }: { className?: string }) {

    const { data, error, isLoading } = useSWR('/api/tags', fetcher)
    const tags = data?.tags || [];

    if(isLoading) return <LoadingSkeletonTag />

    return <div className={`${className} flex items-start content-start flex-wrap bg-white rounded-lg p-5 overflow-y-scroll no-scrollbar`}>
        {tags.map((tag, index) => <Tag key={index} name={tag.name} id={tag.id} />)}
    </div>
}

function LoadingSkeletonTag() {
    return <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
}