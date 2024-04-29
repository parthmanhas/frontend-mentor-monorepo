'use client'

import FeedbackContainer from "@/app/components/FeedbackContainer";
import Navbar from "@/app/components/Navbar";
import { ISortOption, SORT_OPTION } from "@/app/constants/constants";
import { useState } from "react";

export default function Page() {

    const [sortOption, setSortOption] = useState<ISortOption>(SORT_OPTION[0]);

    const handleSortChange = (option: ISortOption) => {
        setSortOption(option);
    }

    return (
        <div className="w-full md:p-8 max-w-6xl">
            <Navbar handleSortChange={handleSortChange}>
                <FeedbackContainer sortOption={sortOption} />
            </Navbar>
        </div>
    )
}