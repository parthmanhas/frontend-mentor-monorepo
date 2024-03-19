'use client';

import NavbarDesktop from "../components/NavbarDesktop";
import NavbarMobile from "../components/NavbarMobile";
import NavbarTab from "../components/NavbarTab";
import { useMediaQuery } from '@/hooks/use-media-query';
import SuggestionsBar from "../components/SuggestionsBar";

export default function Page() {
    const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 767px)");
    const isTab = useMediaQuery("(min-width: 768px) and (max-width: 991px)");
    const isDesktop = useMediaQuery("(min-width: 992px)");
    return (
        <div className="md:p-8 bg-white-lilac-50 h-[100vh]">
            {isMobile && <NavbarMobile />}
            {isTab && <NavbarTab />}
            <div className="grid grid-cols-10 gap-4">
                {isDesktop && <NavbarDesktop className="w-full h-[100vh] col-span-3" />}
                <div className="w-full h-[100vh] col-span-7">
                    <SuggestionsBar />
                </div>
            </div>
        </div>
    )
}