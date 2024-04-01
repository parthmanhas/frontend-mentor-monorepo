import clsx from "clsx";
import { FaComment } from "react-icons/fa6";

export default function CommentsNumber({ count }: { count: number }) {
    return <div className="flex items-center self-center hover:cursor-pointer">
        <FaComment className="hover:cursor-pointer" color="lightgray" />
        <h3 className={clsx({
            "text-east-bay-900 ml-3": count > 0,
            "text-gray-400 ml-3": count === 0
        })}>{count}</h3>
    </div>
}