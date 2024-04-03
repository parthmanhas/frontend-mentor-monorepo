import Tag from '@/app/components/Tag';
import Upvote from '@/app/components/Upvote';
import CommentsNumber from '@/app/components/CommentsNumber';
import { Status } from '../interfaces/interface';
import clsx from 'clsx';
export default function RoadmapCard({ status, title, subtitle, tags = [], upvotes, commentsCount }: { status: Status, title: string, subtitle: string, tags: string[], upvotes: number, commentsCount: number }) {
    return <div className="mt-8">
        <div className={clsx({
            "bg-white p-8 rounded-md border-t-8": true,
            "border-t-yellow-500": status.color === "yellow",
            "border-t-purple-500": status.color === "purple",
            "border-t-blue-500": status.color === "blue",
        })}>
            <div className="flex items-center mb-2">
                <div className={`w-2 h-2 bg-${status.color}-500 rounded-full mr-3`}></div>
                <p className="text-waikawa-gray-700">{status.name}</p>
            </div>
            <p className="font-bold mb-2 hover:text-royal-blue-500 hover:cursor-pointer">{title}</p>
            <p className="text-waikawa-gray-700 mb-2">{subtitle}</p>
            {/* <Tag name="Feature" /> */}
            {tags.map(tag => <Tag name={tag} />)}
            <div className="flex justify-between mt-2">
                <Upvote votes={upvotes} className="bg-zircon-50 flex items-center justify-between w-[45px] px-3 py-2 rounded-lg box-content hover:cursor-pointer hover:bg-royal-blue-200" />
                <CommentsNumber count={commentsCount} />
            </div>
        </div>
    </div>
}