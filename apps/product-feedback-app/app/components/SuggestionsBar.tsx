import { TbBulb } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import DropDown from "./DropDown";

export default function SuggestionsBar() {
    return <div className="bg-east-bay-900 md:rounded-md p-5 flex items-center justify-between">
        <div className="flex items-baseline">
            <TbBulb className="self-end hidden md:block" size={30} />
            <h2 className="ml-3 hidden md:block">6 Suggestions</h2>
            <DropDown heading="Sort By:" options={['Most Upvotes', 'Most Downvotes', 'Most Comments', 'Least Comments']} className="ml-3 sm:ml-7" />
        </div>
        <button className="flex items-center rounded-md bg-electric-violet-600 p-2 sm:p-3 hover:cursor-pointer">
            <FaPlus size={10} />
            <p className="ml-1 sm:ml-3 text-xs sm:semibold">Add Feedback</p>
        </button>
    </div>
}