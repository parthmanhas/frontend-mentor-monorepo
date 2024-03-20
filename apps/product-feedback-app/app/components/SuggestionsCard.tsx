import Comments from "./Comments";
import Tag from "./Tag";
import Upvote from "./Upvote";

export default function SuggestionsCard({ className, heading, description }: { className: string, heading: string, description: string }) {
    return <div className={`${className} bg-white grid grid-cols-10 rounded-lg p-5 gap-8`}>
        <div className="col-span-1">
            <Upvote />
        </div>
        <div className="col-span-8 flex flex-col flex-shrink-0">
            <h3 className="text-east-bay-900 mb-1">{heading}</h3>
            <p className="text-waikawa-gray-700 mb-2">{description}</p>
            <Tag name="Enhancement" />
        </div>
        <div className="col-span-1 flex">
            <Comments />
        </div>
    </div>
}