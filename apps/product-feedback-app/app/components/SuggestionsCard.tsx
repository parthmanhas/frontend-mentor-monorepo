import { Feedback } from "@prisma/client";
import CommentsNumber from "./CommentsNumber";
import Tag from "./Tag";
import Upvote from "./Upvote";

export default function SuggestionsCard({ className, data }: {
    className?: string, data: {
        _count: {
            comments: number;
        };
    } & Feedback
}) {
    return <div className={`${className} bg-white grid grid-cols-10 rounded-lg p-5 md:gap-8 hover:cursor-pointer`}>
        <div className="col-span-1 hidden md:block">
            <Upvote feedbackId={data.id} initialVotes={data.votes} />
        </div>
        <div className="col-span-10 md:col-span-8 flex flex-col flex-shrink-0">
            <h3 className="text-east-bay-900 mb-1">{data.title}</h3>
            <p className="text-waikawa-gray-700 mb-2">{data.feedback}</p>
            <Tag name="Enhancement" />
            <div className="flex justify-between grow-1 md:hidden">
                <Upvote feedbackId={data.id} initialVotes={data.votes} />
                <CommentsNumber count={data._count.comments} />
            </div>
        </div>
        <div className="col-span-1 hidden md:flex">
            <CommentsNumber count={data._count.comments} />
        </div>
    </div>
}