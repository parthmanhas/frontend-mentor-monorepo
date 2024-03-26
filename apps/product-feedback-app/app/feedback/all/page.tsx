'use client';

import NavbarDesktop from "../../components/NavbarDesktop";
import NavbarMobile from "../../components/NavbarMobile";
import NavbarTab from "../../components/NavbarTab";
import { useMediaQuery } from '@/hooks/use-media-query';
import SuggestionsBar from "../../components/SuggestionsBar";
import SuggestionsCard from "../../components/SuggestionsCard";
import Empty from "@/app/components/Empty";

export default function Page() {
    const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 767px)");
    const isTab = useMediaQuery("(min-width: 768px) and (max-width: 991px)");
    const isDesktop = useMediaQuery("(min-width: 992px)");

    const suggestions = [
        {heading: 'Add tags for solutions', description: 'Easier to search for solutions based on a specific stack.'},
        {heading: 'Add a dark theme option', description: 'It would help people with light sensitivities and who prefer dark mode.'},
        {heading: 'Q&A within the challenge hubs', description: 'Challenge-specific Q&A would make for easy reference.'},
        {heading: 'Allow image/video upload to feedback', description: 'Images and screencasts can enhance comments on solutions.'},
        {heading: 'Ability to follow others', description: 'Stay updated on comments and solutions other people post.'},
        {heading: 'Preview images not loading', description: 'Challenge preview images are missing when you apply a filter.'},
    ]
    return (
        <div className="md:p-8 max-w-6xl">
            {isMobile && <NavbarMobile />}
            {isTab && <NavbarTab />}
            <div className="grid grid-cols-10 gap-4 overflow-y-auto no-scrollbar">
                {isDesktop && <NavbarDesktop className="w-full col-span-3" />}
                <div className="w-full col-span-10 md:mt-5 lg:mt-0 lg:col-span-7">
                    <SuggestionsBar />
                    {/* <Empty /> */}
                    {suggestions.map((suggestion, index) => <SuggestionsCard key={index} heading={suggestion.heading} description={suggestion.description} className="m-5 md:m-0 md:mt-3"/>)}
                </div>
            </div>
        </div>
    )
}