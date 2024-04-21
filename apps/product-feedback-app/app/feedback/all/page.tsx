import FeedbackContainer from "@/app/components/FeedbackContainer";
import Navbar from "@/app/components/Navbar";

export default function Page() {

    return (
        <div className="w-full md:p-8 max-w-6xl">
            <Navbar>
                <FeedbackContainer />
            </Navbar>
        </div>
    )
}