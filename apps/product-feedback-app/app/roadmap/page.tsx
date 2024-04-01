import { FaChevronLeft } from "react-icons/fa6";
import Button from "../components/Button";
import Tag from "../components/Tag";
import Upvote from "../components/Upvote";
import CommentsNumber from "../components/CommentsNumber";
import RoadmapCard from "../components/RoadmapCard";
import { Live } from '@/app/interfaces/interface';

export default function Page() {
    return <div className="w-full max-w-6xl">
        <div className="bg-east-bay-900 flex justify-between items-center p-5 w-full rounded-md mt-3">
            <div>
                <Button variant="none" useDefaultClasses={false} className="flex items-center hover:cursor-pointer mb-1">
                    <div className="flex items-center">
                        <FaChevronLeft color="white" className="mr-2" />
                        <p className="font-semibold text-white">Go Back</p>
                    </div>
                </Button>
                <h1>Roadmap</h1>
            </div>
            <Button className="h-fit" />
        </div>
        <div className="grid grid-cols-3 gap-5 text-black">
            <div className="mt-8">
                <h2>Planned (2)</h2>
                <p className="text-waikawa-gray-800">Ideas prioritized for research</p>
                <RoadmapCard status={{ name: "Planned", color: "yellow" }}
                    title="More comprehensive reports"
                    subtitle="It would be great to see a more detailed breakdown of solutions."
                    tags={['Feature']}
                    upvotes={112}
                    commentsCount={2} />
            </div>
            <div className="mt-8">
                <h2>In-Progress (3)</h2>
                <p className="text-waikawa-gray-800">Currently being developed</p>
                <RoadmapCard status={{ name: "In-Progress", color: "purple" }}
                    title="One-click portfolio generation"
                    subtitle="Add ability to create professional looking portfolio from profile."
                    tags={['Feature']}
                    upvotes={62}
                    commentsCount={1} />
                <RoadmapCard status={{ name: "In-Progress", color: "purple" }}
                    title="Bookmark challenges"
                    subtitle="Be able to bookmark challenges to take later on."
                    tags={['Feature']}
                    upvotes={31}
                    commentsCount={1} />
                <RoadmapCard status={{ name: "In-Progress", color: "purple" }}
                    title="Animated solution screenshots"
                    subtitle="Screenshots of solutions with animations don’t display content."
                    tags={['Bug']}
                    upvotes={9}
                    commentsCount={0} />

            </div>
            <div className="mt-8">
                <h2>Live (1)</h2>
                <p className="text-waikawa-gray-800">Released features</p>
                <RoadmapCard status={{ name: "Live", color: "blue" }}
                    title="Add micro-interactions"
                    subtitle="Small animations at specific points can add delight."
                    tags={['Enhancement']}
                    upvotes={112}
                    commentsCount={2} />
            </div>

        </div>
    </div>
}