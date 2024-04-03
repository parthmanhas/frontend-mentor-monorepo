'use client';

import { FaChevronLeft } from "react-icons/fa6";
import Button from "../components/Button";
import Tag from "../components/Tag";
import Upvote from "../components/Upvote";
import CommentsNumber from "../components/CommentsNumber";
import RoadmapCard from "../components/RoadmapCard";
import { Live, Status } from '@/app/interfaces/interface';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useState } from "react";
import clsx from "clsx";

export default function Page() {

    const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 767px)");
    const [tab, setTab] = useState<Status>({ name: "Planned", color: "yellow" });

    const mobileUI = <div className="w-full">
        <div className="bg-east-bay-900 flex justify-between items-center w-full p-4">
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
        <div className="grid grid-cols-3 text-waikawa-gray-300 border-b-2 border-b-waikawa-gray-300">
            <h3 onClick={() => setTab({ name: "Planned", color: "yellow" })} className={clsx({ "py-5 w-full text-center": true, " border-b-4 border-b-yellow-500 text-east-bay-900": tab.name === "Planned" })}>Planned (2)</h3>
            <h3 onClick={() => setTab({ name: "In-Progress", color: "purple" })} className={clsx({ "py-5 w-full text-center": true, " border-b-4 border-b-purple-500 text-east-bay-900": tab.name === "In-Progress" })}>In Progress (2)</h3>
            <h3 onClick={() => setTab({ name: "Live", color: "blue" })} className={clsx({ "py-5 w-full text-center": true, " border-b-4 border-b-blue-500 text-east-bay-900": tab.name === "Live" })}>Live (1)</h3>
        </div>
        {tab.name === "Planned" && <div className="mt-8 p-5 text-east-bay-900">
            <h2>Planned (2)</h2>
            <p className="text-waikawa-gray-800">Ideas prioritized for research</p>
            <RoadmapCard status={{ name: "Planned", color: "yellow" }}
                title="More comprehensive reports"
                subtitle="It would be great to see a more detailed breakdown of solutions."
                tags={['Feature']}
                upvotes={112}
                commentsCount={2} />
        </div>}
        {tab.name === "In-Progress" && <div className="mt-8 p-5 text-east-bay-900">
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
        </div>}
        {tab.name === "Live" && <div className="mt-8 p-5 text-east-bay-900">
            <h2>Live (1)</h2>
            <p className="text-waikawa-gray-800">Released features</p>
            <RoadmapCard status={{ name: "Live", color: "blue" }}
                title="Add micro-interactions"
                subtitle="Small animations at specific points can add delight."
                tags={['Enhancement']}
                upvotes={112}
                commentsCount={2} />
        </div>}
    </div>

    const mobileAboveUI = <div className="w-full max-w-6xl md:p-7 xl:p-0">
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

    return (<>{isMobile ? mobileUI : mobileAboveUI}</>);
}