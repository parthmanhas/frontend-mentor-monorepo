import { TbBulb } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import DropDown from "./DropDown";
import Button from "./Button";

export default function SuggestionsBar() {
    return <div className="bg-east-bay-900 md:rounded-md p-5 flex items-center justify-between">
        <div className="flex items-center">
            <TbBulb className="self-end hidden md:block" size={30} />
            <h2 className="ml-3 hidden md:block">6 Suggestions</h2>
            <DropDown heading="Sort By:" options={['Most Upvotes', 'Most Downvotes', 'Most Comments', 'Least Comments']} className="ml-3 sm:ml-7 bg-east-bay-900" />
        </div>
        <Button />
    </div>
}