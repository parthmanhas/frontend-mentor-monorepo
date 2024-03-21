import { FaChevronUp } from "react-icons/fa6";

export default function Upvote() {
    return <div className="bg-zircon-50 w-fit rounded-lg flex md:flex-col justify-center items-center box-content px-3 py-2 md:p-3 hover:cursor-pointer hover:bg-royal-blue-200">
        <FaChevronUp color="blue" />
        <h4 className="text-east-bay-900 mt-1 ml-2 md:ml-0">112</h4>
    </div>
}