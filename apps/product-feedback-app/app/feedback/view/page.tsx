import AddComment from "@/app/components/AddComment";
import Button from "@/app/components/Button";
import Comments from "@/app/components/Comments";
import SuggestionsCard from "@/app/components/SuggestionsCard";
import { FaChevronLeft } from "react-icons/fa";

export default function Page() {
    return <div className="mx-auto w-1/2 mt-3">
        <div className="flex justify-between mb-4 w-full">
            <Button variant="none">
                <div className="flex items-center">
                    <FaChevronLeft color="blue" className="mr-2" />
                    <p className="text-waikawa-gray-700 font-semibold">Go Back</p>
                </div>
            </Button>
            <Button variant="blue">Edit Feedback</Button>
        </div>
        <SuggestionsCard heading="Add a dark theme option" description="It would help people with light sensitivities and who prefer dark mode." />
        <Comments />
        <AddComment />
    </div>
}