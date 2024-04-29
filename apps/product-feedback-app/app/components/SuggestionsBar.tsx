import { TbBulb } from "react-icons/tb";
import DropDown from "./DropDown";
import Button from "./Button";
import Link from "next/link";
import { SORT_OPTION } from "../constants/constants";

export default function SuggestionsBar({ handleSortChange }: { handleSortChange: Function }) {
    return <div className="bg-east-bay-900 md:rounded-md p-5 flex items-center justify-between">
        <div className="flex items-center">
            <TbBulb className="self-end hidden md:block" size={30} />
            <h2 className="ml-3 hidden md:block">6 Suggestions</h2>
            <DropDown handleDropDownChange={handleSortChange} heading="Sort By:" options={SORT_OPTION} className="ml-3 sm:ml-7 bg-east-bay-900" />
        </div>
        <Link href="/feedback/new">
            <Button />
        </Link>
    </div>
}