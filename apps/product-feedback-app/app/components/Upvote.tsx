import { FaChevronUp } from "react-icons/fa6";

export default function Upvote() {
    return <div className="bg-zircon-50 w-fit rounded-lg flex flex-col justify-center items-center box-content p-3 hover:cursor-pointer">
        <FaChevronUp color="blue" />
        <h4 className="text-east-bay-900 mt-1">112</h4>
    </div>
}