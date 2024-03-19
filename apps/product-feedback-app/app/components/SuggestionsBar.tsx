import { TbBulb } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import DropDown from "./DropDown";

export default function SuggestionsBar() {
    return <div className="bg-east-bay-900 rounded-md p-5 flex items-center justify-between">
        <div className="flex items-baseline">
            <TbBulb className="self-end" size={30} />
            <h2 className="ml-3">6 Suggestions</h2>
            <DropDown className="ml-7" />
        </div>
        <button className="flex items-center rounded-md bg-electric-violet-600 p-3 hover:cursor-pointer">
            <FaPlus size={10} />
            <p className="ml-3 semibold">Add Feedback</p>
        </button>
    </div>
}